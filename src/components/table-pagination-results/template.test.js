/**
 * @jest-environment jsdom
 */
/* eslint-env jest */

const axe = require('../../../lib/axe-helper')

const { render, getExamples } = require('../../../lib/jest-helpers')

const examples = getExamples('table-pagination-results')

describe('Table-Pagination-Results', () => {
  it('passes basic accessibility tests', async () => {
    const $ = render('table-pagination-results', examples.default)

    const results = await axe($.html())
    expect(results).toHaveNoViolations()
  })

  it('allows additional classes to be added to the component', () => {
    const $ = render('table-pagination-results', {
      currentPage: 1,
      pageSize: 20,
      totalRecords: 100,
      classes: 'extra-class one-more-class'
    })

    const $component = $('.govuk-body')
    expect($component.hasClass('extra-class one-more-class')).toBeTruthy()
  })

  it('renders the default example with text', () => {
    const $ = render('table-pagination-results', examples.default)
    const outputText = $('.govuk-body').text().trim()
    expect(outputText).toEqual('Showing 41 to 60 of 100 customers.')
  })

  it('renders the empty data set', () => {
    const $ = render('table-pagination-results', examples.emptyDataSet)
    const outputText = $('.govuk-body').text().trim()
    expect(outputText).toEqual('')
  })

  it('renders a blank for single page ', () => {
    const $ = render('table-pagination-results', examples.singlePageOfData)
    const outputText = $('.govuk-body').text().trim()
    expect(outputText).toEqual('')
  })

  it('renders a two data pages', () => {
    const $ = render('table-pagination-results', examples.twoPagesOfData)
    const outputText = $('.govuk-body').text().trim()
    expect(outputText).toEqual('Showing 11 to 15 of 15 records.')
  })

  it('renders page 100 of 100', () => {
    const $ = render('table-pagination-results', examples.pageOneHundered)
    const outputText = $('.govuk-body').text().trim()
    expect(outputText).toEqual('Showing 91 to 100 of 100 records.')
  })

  it('renders Welsh', () => {
    const $ = render('table-pagination-results', examples.welsh)
    const outputText = $('.govuk-body').text().replace(/\s+/g, ' ').trim()
    expect(outputText).toEqual('Yn dangos 41 i 60 o 100 o gofnodion.')
  })
})
