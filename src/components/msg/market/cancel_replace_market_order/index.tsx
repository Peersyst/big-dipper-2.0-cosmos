import React from 'react';
import Trans from 'next-translate/Trans';
import { Typography } from '@material-ui/core';
import { Name } from '@components';
import {
  formatToken, formatNumber,
} from '@utils/format_token';
import { MsgCancelReplaceMarketOrder } from '@models';
import { useProfileRecoil } from '@recoil/profiles';

const CancelReplaceMarketOrder = (props: {
  message: MsgCancelReplaceMarketOrder;
}) => {
  const { message } = props;
  const owner = useProfileRecoil(message.owner);
  const ownerMoniker = owner ? owner?.name : message.owner;
  const destination = formatToken(message.destination.amount, message.destination.denom);
  return (
    <Typography>
      <Trans
        i18nKey="message_contents:txCancelReplaceMarketOrderContent"
        components={[
          (
            <Name
              address={message.owner}
              name={ownerMoniker}
            />
          ),
          <b />,
          <b />,
          <b />,
        ]}
        values={{
          clientOrderId: message.originalClientOrderId,
          source: message.source,
          destination: `${formatNumber(destination.value, destination.exponent)} ${destination.displayDenom.toUpperCase()}`,
        }}
      />
    </Typography>
  );
};

export default CancelReplaceMarketOrder;
