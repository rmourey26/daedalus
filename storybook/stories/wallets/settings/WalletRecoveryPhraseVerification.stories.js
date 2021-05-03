// @flow
import React from 'react';
import dayjs from 'dayjs';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {
  withKnobs,
  select,
  boolean,
  object,
  optionsKnob as options,
} from '@storybook/addon-knobs';
import {
  LEGACY_WALLET_RECOVERY_PHRASE_WORD_COUNT,
  WALLET_RECOVERY_PHRASE_WORD_COUNT,
} from '../../../../source/renderer/app/config/cryptoConfig';
import { RECOVERY_PHRASE_VERIFICATION_TIMES as times } from '../../../../source/renderer/app/config/walletRecoveryPhraseVerificationConfig';

// Helpers
import StoryDecorator from '../../_support/StoryDecorator';

// Screens
import WalletRecoveryPhraseVerificationWidget from '../../../../source/renderer/app/components/wallet/settings/WalletRecoveryPhraseVerificationWidget';

storiesOf('Wallets|Settings', module)
  .addDecorator((story, context) => (
    <StoryDecorator>{withKnobs(story, context)}</StoryDecorator>
  ))
  // ====== Stories ======

  .add(
    'Recovery Prase Verification - Widget',
    ({ locale }: { locale: string }) => {
      const groupId = 'Recovery Phrase Verification';
      const wordCount = options(
        'Word count',
        {
          [WALLET_RECOVERY_PHRASE_WORD_COUNT]: `${WALLET_RECOVERY_PHRASE_WORD_COUNT}`,
          [LEGACY_WALLET_RECOVERY_PHRASE_WORD_COUNT]: `${LEGACY_WALLET_RECOVERY_PHRASE_WORD_COUNT}`,
        },
        `${WALLET_RECOVERY_PHRASE_WORD_COUNT}`,
        { display: 'inline-radio' },
        groupId
      );
      const veriticationTimeOptions = {
        '1 month ago': dayjs().subtract(30, 'days'),
        '2 months': dayjs().subtract(30 * 2, 'days'),
        '5 months ago': dayjs().subtract(30 * 5, 'days'),
        '6+ months ago': dayjs().subtract(times.warning + 1, 'days'),
        '1 year ago': dayjs().subtract(times.notification + 1, 'days'),
      };
      const creationTimeOptions = {
        '1 month ago': dayjs().subtract(30, 'days'),
        '2 months': dayjs().subtract(60, 'days'),
        '3-5 months': dayjs().subtract(times.okFewMonths + 1, 'days'),
        '5 months ago': dayjs().subtract(times.okFewWeeks + 1, 'days'),
        '1 week left for 6 months': dayjs().subtract(
          times.okFewDays + 1,
          'days'
        ),
        '6+ months ago': dayjs().subtract(times.warning + 1, 'days'),
        '1 year ago': dayjs().subtract(times.notification + 1, 'days'),
      };

      const wasAlreadyVerified = boolean('Already verified?', false, groupId);
      const creationDate = !wasAlreadyVerified
        ? select(
            'Wallet creation date',
            creationTimeOptions,
            creationTimeOptions['1 month ago'],
            groupId
          )
        : creationTimeOptions['1 month ago'];
      const recoveryPhraseVerificationDate = wasAlreadyVerified
        ? select(
            'Last verification date',
            veriticationTimeOptions,
            veriticationTimeOptions['1 month ago'],
            groupId
          )
        : null;
      const containerStyle = object('Container Style', { padding: 20 });
      return (
        <div style={containerStyle} className="WalletSettings_component">
          <WalletRecoveryPhraseVerificationWidget
            creationDate={new Date(creationDate)}
            locale={locale}
            onVerify={action('onVerify')}
            recoveryPhraseVerificationDate={recoveryPhraseVerificationDate}
            wordCount={parseInt(wordCount, 10)}
            isLegacy={boolean('isLegacy', true)}
          />
        </div>
      );
    }
  );
