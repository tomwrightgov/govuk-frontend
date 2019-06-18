const Chance = require('chance');
const chance = new Chance(12345);

const pageSize = 10;
let randomListData = null;

function generateRandomDataForList() {
  randomListData = {
    pageSize,
    totalRecords: chance.integer({ min: 200, max: 1000 }),
    records: [],
  };

  for (let i = 0; i < randomListData.totalRecords; i++) {
    randomListData.records.push({
      id: chance.ssn(),
      name: chance.name({ nationality: 'en' }),
      address: chance.address(),
      dob: chance.birthday({ string: true, american: false }),
      claim: `£${chance.floating({ min: 50, max: 15000, fixed: 2 })}`,
    });
  }

  randomListData.maxPage = Math.ceil(
    randomListData.totalRecords / randomListData.pageSize,
  );
}

function dataForpage(page) {
  if (!randomListData) {
    generateRandomDataForList();
  }

  if (!page || page < 0) {
    page = 1;
  } else if (page > randomListData.maxPage) {
    page = randomListData.maxPage;
  }

  const firstRecordOffset = (page - 1) * randomListData.pageSize;

  return {
    paginationData: {
      pageSize: randomListData.pageSize,
      totalRecords: randomListData.totalRecords,
      currentPage: page,
      itemType: 'records'
    },
    records: randomListData.records
      .slice(firstRecordOffset, firstRecordOffset + randomListData.pageSize)
      .map(v => {
        return [
          {
            text: v.id,
          },
          {
            text: v.name,
          },
          {
            text: v.address,
          },
          {
            text: v.dob,
          },
          {
            text: v.claim,
            format: 'numeric',
          },
        ];
      }),
    searchTerm: 'active-customers',
  };
}

module.exports = (app) => {
  app.get(
    '/full-page-examples/customer-table-pagination',
    (request, response) => {
      let currentPage = request.query.page;
      response.render('./full-page-examples/customer-table-pagination/index', dataForpage(currentPage))
    }
  )
}

