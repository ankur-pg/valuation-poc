// Run with: node price-benchmark.js

import axios from 'axios'
import https from 'https'

const API_URL = 'PP_API'
const UNIT_TYPES = ['2-room', '3-room', '4-room']
const POSTCODES = ['469970', '469971', '469972', '469973', '469974', '469975', '469976']

const getArea = (unitType) => {
  switch (unitType) {
    case '2-room': return 926
    case '3-room': return 1184
    case '4-room': return 1432
    default: return 1000
  }
}

const axiosInstance = axios.create({
  httpsAgent: new https.Agent({ keepAlive: true }),
  timeout: 10000
})

const callApi = async (unitType, postcode) => {
  const payload = {
    postcode,
    property_area_sqft: getArea(unitType),
    property_type: 'condo'
  }

  try {
    const res = await axiosInstance.post(API_URL, payload)
    const info = res.data?.results?.valuation_info || {}
    return {
      unitType,
      postcode,
      lower: info.current_proxyprice_range_lower_limit,
      upper: info.current_proxyprice_range_upper_limit,
      confidence: info.current_proxyprice_confidence_score
    }
  } catch (err) {
    return {
      unitType,
      postcode,
      error: err.message
    }
  }
}

const runBenchmark = async () => {
  const start = Date.now()

  const allCalls = []
  for (const unit of UNIT_TYPES) {
    for (const postcode of POSTCODES) {
      allCalls.push(callApi(unit, postcode))
    }
  }

  const results = await Promise.all(allCalls)
  const end = Date.now()

  const success = results.filter(r => !r.error)
  const failed = results.filter(r => r.error)

  console.log('\n=== Raw Benchmark Result ===')
  console.log(`Total API calls:        ${results.length}`)
  console.log(`✅ Successful responses: ${success.length}`)
  console.log(`❌ Failed responses:     ${failed.length}`)
  console.log(`⏱️  Execution time:       ${((end - start) / 1000).toFixed(2)} seconds`)

  if (failed.length > 0) {
    console.log(`Errors:`, failed.map(f => `${f.unitType} @ ${f.postcode}: ${f.error}`))
  }
}

runBenchmark()
