import React from 'react';
import Emojify from 'react-emojione';
import MicrolinkCard from '@microlink/react';
import Linkify from 'linkifyjs/react';
import getUrls from 'get-urls';

import StyledMessage from './StyledMessage';
import Nickname from '../Nickname/Nickname';
import Timestamp from '../Timestamp/Timestamp';

export interface IMessage {
    from: string;
    content: string;
    time: string;
    type: string;
}

class Message extends React.Component<{message: IMessage}> {
    public render () {
        const { message } = this.props;

        return (
            <React.Fragment>
                <div id='nickname-container'>
                    {message.type === 'received' && <Nickname value={message.from}/>}
                    <Timestamp value={message.time} floatToRight={message.type === 'sent'} />
                </div>
                <StyledMessage type={message.type}>
                    <Linkify><Emojify>{message.content} {this.parseURLs(message.content)}</Emojify></Linkify>
                </StyledMessage>
            </React.Fragment>
        );
    }

    private parseURLs = (text: string) => {
        const urls = getUrls(text);
        if(!urls.size) {
            return;
        }

        const parsedURLs = Array.from(urls).map((url: string, idx: number) => (
            <MicrolinkCard url={url} key={idx} />
        ));

        return <React.Fragment>
            {parsedURLs}
        </React.Fragment>
    };
}

export default Message;