import { shallowMount } from '@vue/test-utils';
import AppNotifications from '@/common/components/AppNotifications';
import AppButton from '@/common/components/AppButton';

describe('AppNotifications', () => {
  const mocks = {
    $store: {
      state: {
        notifications: []
      }
    }
  };

  const stubs = {
    AppButton
  };

  let wrapper;
  const createComponent = options => {
    wrapper = shallowMount(AppNotifications, options);
  };

  afterEach(() => {
    wrapper.destroy();
    mocks.$store.state.notifications = [];
  });

  it('doesn\'t render out when no notifications', () => {
    createComponent({ mocks });
    expect(wrapper.html()).toBeFalsy();
  });

  it('renders out when we have notifications', () => {
    mocks.$store.state.notifications = [
      { text: 'text', type: 'warning' }
    ];
    createComponent({ mocks });
    expect(wrapper.html()).toBeTruthy();
  });

  it('renders out notification', () => {
    mocks.$store.state.notifications = [
      { text: 'text', type: 'warning' }
    ];
    createComponent({ stubs, mocks });
    expect(wrapper.html()).toContain('notification--warning');
    expect(wrapper.html()).toContain('text');
  });
});
