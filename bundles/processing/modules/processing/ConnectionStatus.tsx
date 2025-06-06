import React from 'react';
import { Button, Callout, Clickable, Header, Interactive, Stack, Text, useTooltip } from '@faulty/gdq-design';

import { getSocketPath } from '@public/apiv2/reducers/sockets';
import { useAppSelector } from '@public/apiv2/Store';
import InfoCircle from '@uikit/icons/InfoCircle';

import styles from './ConnectionStatus.mod.css';

interface ConnectionStatusProps {
  refetch: () => unknown;
  isFetching: boolean;
}

const STATUS_CONTENT = {
  connected: {
    heading: 'Live Socket Connected',
    body: 'New donations will appear as they are received and automatically update whenever anyone processes them.',
  },
  disconnected: {
    heading: 'Socket Disconnected',
    body: 'You can still take action on donations, but you will not see new donations in real time. Please refresh the page to reconnect.',
  },
};

export default function ConnectionStatus({ refetch, isFetching }: ConnectionStatusProps) {
  const isConnected = useAppSelector(state => state.sockets[getSocketPath(state, 'processing')] === WebSocket.OPEN);

  const statusContent = STATUS_CONTENT[isConnected ? 'connected' : 'disconnected'];
  const [tooltipProps] = useTooltip<HTMLSpanElement>(
    <Text variant="text-sm/normal" className={styles.tooltip}>
      {statusContent.body}
    </Text>,
    {
      attach: 'right',
    },
  );

  return (
    <Callout type={isConnected ? 'success' : 'danger'}>
      <Stack align="stretch">
        <Header tag="h2" variant="header-sm/normal">
          {statusContent.heading}
          <Interactive as="span" className={styles.tipTrigger}>
            <Clickable as="span" {...tooltipProps}>
              <InfoCircle />
            </Clickable>
          </Interactive>
        </Header>
        {!isConnected ? <Button onPress={refetch}>{isFetching ? 'Loading' : 'Force Refresh'}</Button> : null}
      </Stack>
    </Callout>
  );
}
