import React from 'react'
import { shallow } from 'enzyme'
import MediaQuery from 'react-responsive'
import {
  MediaQueryWrapper,
  responsiveWrapper,
} from '../src'

const shallowWithStore = (component) => {
  const context = {}
  return shallow(component, { context })
}

describe('components', () => {
  const query = 'min-width: 123'
  const fakeWidth = 123
  const child = <div>foo</div>

  describe('MediaQueryWrapper', () => {
    it('works', () => {
      const component = shallow(<MediaQueryWrapper />)
      expect(component).to.have.type(MediaQuery)
    })
    it('defaults to div', () => {
      const component = shallow(<MediaQueryWrapper />)
      expect(component).to.have.prop('component').deep.equal('div')
    })
    it('supports other components', () => {
      const component = shallow(<MediaQueryWrapper component="p" />)
      expect(component).to.have.prop('component').deep.equal('p')
    })

    it('handles MediaQuery props', () => {
      const component = shallow(<MediaQueryWrapper {...{ query }} />)
      expect(component).to.have.prop('query').deep.equal(query)
    })
    it('handles fakeWidth', () => {
      const component = shallow(<MediaQueryWrapper {...{ fakeWidth, query }} />)
      expect(component).to.have.prop('values').deep.equal({ deviceWidth: fakeWidth, width: fakeWidth })
      expect(component).to.have.prop('query').deep.equal(query)
    })
    it('handles dispatch', () => {
      const dispatch = () => {}
      const component = shallow(<MediaQueryWrapper {...{ dispatch }} />)
      expect(component).to.not.have.prop('dispatch')
    })
    it('handles children', () => {
      const component = shallow(<MediaQueryWrapper>{child}</MediaQueryWrapper>)
      expect(component).to.contain(child)
    })
  })
  describe('responsiveWrapper', () => {
    const store = { responsive: { fakeWidth } }
    const Wrapped = responsiveWrapper()

    it('reads fakeWidth from redux', () => {
      const component = shallowWithStore(<Wrapped />, store)
      expect(component).to.have.prop('fakeWidth').deep.equal(fakeWidth)
    })
    it('passes other props along', () => {
      const component = shallowWithStore(<Wrapped {...{ query }} />, store)
      expect(component).to.have.prop('query').deep.equal(query)
    })
  })

})
