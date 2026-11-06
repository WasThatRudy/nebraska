import { useTranslation } from 'react-i18next';

import { applicationsStore } from '../../../stores/Stores';

function ConfirmationContent(props: {
  data: {
    appID: string;
    groupID?: string;
    channelID?: string;
    packageID?: string;
    type: string;
  };
}) {
  const { t } = useTranslation();

  async function processClick() {
    try {
      if (props.data.type === 'application') {
        await applicationsStore().deleteApplication(props.data.appID);
      } else if (props.data.type === 'group' && props.data.groupID !== undefined) {
        await applicationsStore().deleteGroup(props.data.appID, props.data.groupID);
      } else if (props.data.type === 'channel' && props.data.channelID !== undefined) {
        await applicationsStore().deleteChannel(props.data.appID, props.data.channelID);
      } else if (props.data.type === 'package' && props.data.packageID !== undefined) {
        await applicationsStore().deletePackage(props.data.appID, props.data.packageID);
      }
    } catch (err) {
      console.error('Failed to delete:', err);
      alert(t('common|generic_error'));
    }
  }

  return (
    <div className="popover-content" {...props}>
      {t('common|confirmation_prompt')}
      <p className="button-group">
        <button type="button" className="confirm-dialog-btn-abord">
          {t('frequent|no')}
        </button>
        <button type="button" className="confirm-dialog-btn-confirm" onClick={processClick}>
          {t('frequent|yes')}
        </button>
      </p>
    </div>
  );
}

export default ConfirmationContent;
