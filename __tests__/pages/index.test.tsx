import { render, cleanup, waitForElement } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';

import Index from '../../pages/index';
import I18Next from '../../utils/__mocks__/i18n';

afterEach(cleanup);

// FIXME: Component with localization should be correcly tested
it('Should render index page without crash', async () => {
  const { getByText } = render(
    <I18nextProvider i18n={I18Next}>
      <Index />
    </I18nextProvider>,
  );

  await waitForElement(() => getByText(/Hello world!/i));
});
