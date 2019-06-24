const Chance = require('chance')
const chance = new Chance(12345)

const pageSize = 10
let randomListData = null

function generateRandomDataForList () {
  randomListData = {
    pageSize,
    totalRecords: chance.integer({ min: 200, max: 1000 }),
    records: []
  }

  for (let i = 0; i < randomListData.totalRecords; i++) {
    randomListData.records.push({
      id: chance.ssn(),
      firstName: chance.first({ nationality: 'en' }),
      lastName: chance.last({ nationality: 'en' }),
      address: chance.address(),
      dob: chance.birthday({ string: true, american: false }),
      claim: `£${chance.floating({ min: 50, max: 15000, fixed: 2 })}`
    })
  }

  randomListData.records = randomListData.records.sort((a, b) =>
    `${a.lastName}, ${a.firstName}`.localeCompare(
      `${b.lastName}, ${b.firstName}`
    )
  )

  randomListData.maxPage = Math.ceil(
    randomListData.totalRecords / randomListData.pageSize
  )
}

function dataForpage (page, language) {
  if (!randomListData) {
    generateRandomDataForList()
  }

  if (!page || page < 0) {
    page = 1
  } else if (page > randomListData.maxPage) {
    page = randomListData.maxPage
  }

  const firstRecordOffset = (page - 1) * randomListData.pageSize

  const paginationData = {
    pageSize: randomListData.pageSize,
    totalRecords: randomListData.totalRecords,
    currentPage: page,
    textItemType: 'records'
  }

  let languageSwitch

  if (language === 'cy') {
    paginationData.textPrevious = 'Tudalen flaenorol'
    paginationData.textNext = 'Tudalen nesaf'
    paginationData.textPage = 'Tudalen'
    paginationData.textpage = '&nbsp;'
    paginationData.textItemType = 'o gofnodion'
    paginationData.textShowing = 'Yn dangos'
    paginationData.textTo = 'i'
    paginationData.textOf = 'o'
    paginationData.queryPostfix = '&lang=cy'

    languageSwitch = {
      text: 'Change language to English',
      url: `?page=${page}&lang=en`
    }
  } else {
    languageSwitch = {
      text: 'Change language to Welsh',
      url: `?page=${page}&lang=cy`
    }
  }
  return {
    paginationData,
    languageSwitch,
    records: randomListData.records
      .slice(firstRecordOffset, firstRecordOffset + randomListData.pageSize)
      .map(v => {
        return [
          {
            text: v.id
          },
          {
            text: `${v.firstName} ${v.lastName}`
          },
          {
            text: v.address
          },
          {
            text: v.dob
          },
          {
            text: v.claim,
            format: 'numeric'
          }
        ]
      })
  }
}

module.exports = app => {
  app.get(
    '/full-page-examples/customer-table-pagination',
    (request, response) => {
      const currentPage = request.query.page
      const language = request.query.lang ? request.query.lang : ''
      response.render(
        './full-page-examples/customer-table-pagination/index',
        dataForpage(currentPage, language)
      )
    }
  )
}
