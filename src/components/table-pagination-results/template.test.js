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
})
