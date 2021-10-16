import React from 'react';
import { connect } from 'react-redux';
import StyledChatArea from './StyledChatArea';
import Message, { IMessage } from '../Message/Message';
import { scrollToBottom } from '../../utils/commons';

interface IChatAreaState {
    messageState: {
        messages: []
    }
}

interface IChatAreaProps {
    messages: []
}

export class ChatArea extends React.Component {
    private chatAreaRef = React.createRef<HTMLDivElement>()

    public render() {
        const {messages} = this.props as IChatAreaProps;

        return (
            <StyledChatArea ref={this.chatAreaRef}>
                {messages.map((el: IMessage, idx: number) => {
                    return (
                        <React.Fragment key={idx}>
                            <Message message={el} />
                        </React.Fragment>
                    )
                })}
            </StyledChatArea>
        );
    }

    public componentDidUpdate(): void {
        const chatAreaElement: Element = this.chatAreaRef.current as Element;
        const shouldScroll: boolean = chatAreaElement.scrollTop + chatAreaElement.clientHeight !== chatAreaElement.scrollHeight;

        if(shouldScroll) {
            scrollToBottom(chatAreaElement);
        }
    }
}

const mapStateToProps = (state: IChatAreaState) => ({
    messages: state.messageState.messages
});

export default connect(mapStateToProps)(ChatArea);