/**
 * @jest-environment jsdom
 */
/* eslint-env jest */

const axe = require('../../../lib/axe-helper')

const { render, getExamples } = require('../../../lib/jest-helpers')

const examples = getExamples('table-pagination-control')

describe('Table-Pagination-Control', () => {
  it('passes basic accessibility tests', async () => {
    const $ = render('table-pagination-control', examples.default)

    const results = await axe($.html())
    expect(results).toHaveNoViolations()
  })

  it('allows additional classes to be added to the component', () => {
    const $ = render('table-pagination-control', {
      currentPage: 1,
      pageSize: 20,
      totalRecords: 100,
      classes: 'extra-class one-more-class'
    })

    const $component = $('.govuk-body')
    expect($component.hasClass('extra-class one-more-class')).toBeTruthy()
  })

  it('renders the default example with text', () => {
    const $ = render('table-pagination-control', examples.default)
    const outputText = $('.govuk-body').text().trim()
    expect(outputText).toEqual('Showing 41 to 60 of 100 customers.')
  })

  it('renders the empty data set', () => {
    const $ = render('table-pagination-control', examples.emptyDataSet)
    const outputText = $('.govuk-body').text().trim()
    expect(outputText).toEqual('')
  })

  it('renders a blank for single page ', () => {
    const $ = render('table-pagination-control', examples.singlePageOfData)
    const outputText = $('.govuk-body').text().trim()
    expect(outputText).toEqual('')
  })

  it('renders a two data pages', () => {
    const $ = render('table-pagination-control', examples.twoPagesOfData)
    const outputText = $('.govuk-body').text().trim()
    expect(outputText).toEqual('Showing 11 to 15 of 15 records.')
  })

  it('renders page 100 of 100', () => {
    const $ = render('table-pagination-control', examples.pageOneHundered)
    const outputText = $('.govuk-body').text().trim()
    expect(outputText).toEqual('Showing 91 to 100 of 100 records.')
  })
})
