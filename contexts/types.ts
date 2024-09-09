export type PaneLocation = 'left' | 'right';

export interface ConversationMessage {
    _id: string;
    parent_id: string | null;
    parent_version: string | null;
    sender: 'user' | 'ai';
    current_version: string;
    versions: Version[];
}

export interface Version {
    id: string;
    content: string;
    created_at: string;
    child_messages: Record<string, string>;
}

export interface ChatConversation {
    _id: string;
    title: string;
    created_at: string;
    updated_at: string;
    messages: ConversationMessage[];
}
