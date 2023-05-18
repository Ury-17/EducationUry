export type GetMeNotificationsSettingsResponse = {
	notifications: UserNotificationsSettings
}

export type UserNotificationsSettings = {
	newCommentsEmail: boolean;
	newCommentsPush: boolean;
	updateHistoryHubEmail: boolean;
	updateHistoryHubPush: boolean;
	updateRateCommentsEmail: boolean;
	updateRateCommentsPush: boolean;
}