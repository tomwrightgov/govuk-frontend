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
    const outputText = $('.govuk-body').text().replace(/\s+/g, ' ').trim()
    expect(outputText).toEqual('Previous page Next page Page 1 Page 2 Page 3 Page 4 Page 5')
  })

  it('renders the empty data set', () => {
    const $ = render('table-pagination-control', examples.emptyDataSet)
    const outputText = $('.govuk-body').text().replace(/\s+/g, ' ').trim()
    expect(outputText).toEqual('')
  })

  it('renders a blank for single page ', () => {
    const $ = render('table-pagination-control', examples.singlePageOfData)
    const outputText = $('.govuk-body').text().replace(/\s+/g, ' ').trim()
    expect(outputText).toEqual('')
  })

  it('renders a two data pages', () => {
    const $ = render('table-pagination-control', examples.twoPagesOfData)
    const outputText = $('.govuk-body').text().replace(/\s+/g, ' ').trim()
    expect(outputText).toEqual('Previous page Page 1 Page 2')
  })

  it('renders page 100 of 100', () => {
    const $ = render('table-pagination-control', examples.pageOneHundered)
    const outputText = $('.govuk-body').text().replace(/\s+/g, ' ').trim()
    expect(outputText).toEqual('Previous page Page 1 … Page 9 Page 10')
  })

  it('renders Welsh', () => {
    const $ = render('table-pagination-control', examples.welsh)
    const outputText = $('.govuk-body').text().replace(/\s+/g, ' ').trim()
    expect(outputText).toEqual('Tudalen flaenorol Tudalen nesaf Tudalen 1 Tudalen 2 Tudalen 3 Tudalen 4 Tudalen 5')
  })
})
