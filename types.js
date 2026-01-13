export interface CollaborationRequest {
fullName: string;
email: string;
brief: string;
}
export interface CreativeDirection {
visionStatement: string;
moodDescription: string;
pillars: {
title: string;
description: string;
}[];
suggestedAesthetics: string[];
}
export enum AppState {
FORM = 'FORM',
INITIALIZING = 'INITIALIZING',
RESPONSE = 'RESPONSE'
}
