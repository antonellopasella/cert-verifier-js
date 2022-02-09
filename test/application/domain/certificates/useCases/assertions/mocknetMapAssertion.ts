import { VerificationSteps } from '../../../../../../src/constants/verificationSteps';
import { SUB_STEPS } from '../../../../../../src/constants/verificationSubSteps';
import i18n from '../../../../../../src/data/i18n.json';
import currentLocale from '../../../../../../src/constants/currentLocale';

const defaultLanguageSet = i18n[currentLocale.locale];

export default [{
  code: VerificationSteps.formatValidation,
  label: defaultLanguageSet.steps.formatValidationLabel,
  labelPending: defaultLanguageSet.steps.formatValidationLabelPending,
  subSteps: [{
    code: SUB_STEPS.computeLocalHash,
    label: defaultLanguageSet.subSteps.computeLocalHashLabel,
    labelPending: defaultLanguageSet.subSteps.computeLocalHashLabelPending,
    parentStep: VerificationSteps.formatValidation
  }]
}, {
  code: VerificationSteps.hashComparison,
  label: defaultLanguageSet.steps.hashComparisonLabel,
  labelPending: defaultLanguageSet.steps.hashComparisonLabelPending,
  subSteps: [{
    code: SUB_STEPS.compareHashes,
    label: defaultLanguageSet.subSteps.compareHashesLabel,
    labelPending: defaultLanguageSet.subSteps.compareHashesLabelPending,
    parentStep: VerificationSteps.hashComparison
  }, {
    code: SUB_STEPS.checkReceipt,
    label: defaultLanguageSet.subSteps.checkReceiptLabel,
    labelPending: defaultLanguageSet.subSteps.checkReceiptLabelPending,
    parentStep: VerificationSteps.hashComparison
  }]
}, {
  code: VerificationSteps.statusCheck,
  label: defaultLanguageSet.steps.statusCheckLabel,
  labelPending: defaultLanguageSet.steps.statusCheckLabelPending,
  subSteps: [{
    code: SUB_STEPS.checkExpiresDate,
    label: defaultLanguageSet.subSteps.checkExpiresDateLabel,
    labelPending: defaultLanguageSet.subSteps.checkExpiresDateLabelPending,
    parentStep: VerificationSteps.statusCheck
  }]
}];