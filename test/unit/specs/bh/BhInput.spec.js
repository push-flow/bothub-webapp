import { shallowMount, createLocalVue } from '@vue/test-utils';

import BH from 'bh';
import BhInput from 'bh/components/BhInput';


const localVue = createLocalVue();
localVue.use(BH);

describe('BhInput.vue', () => {
  describe('without errors', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallowMount(BhInput, {
        localVue,
        provide: {
          bhField: {
            errors: [],
          },
        },
      });
    });

    test('renders correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('with string errors', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallowMount(BhInput, {
        localVue,
        provide: {
          bhField: {
            errors: ['error 1'],
          },
        },
      });
    });

    test('renders correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('with object errors', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallowMount(BhInput, {
        localVue,
        provide: {
          bhField: {
            errors: [{ erro1: 'error message', error2: 'error message 2' }],
          },
        },
      });
    });

    test('renders correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('with string and object errors', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallowMount(BhInput, {
        localVue,
        provide: {
          bhField: {
            errors: ['string error', { erro1: 'error message', error2: 'error message 2' }],
          },
        },
      });
    });

    test('renders correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
