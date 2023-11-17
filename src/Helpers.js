const config = Object.assign({}, window.appLocalizer);

export function getNonce() {
	return config.nonce;
}

export function getDashboardData() {
	return config.dashboard_data;
}