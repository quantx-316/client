// @ts-nocheck 

import * as React from 'react';
import './index.css';
import {
	widget,
	ChartingLibraryWidgetOptions,
	LanguageCode,
	IChartingLibraryWidget,
	ResolutionString,
} from './charting_library/charting_library.min';

export interface ChartContainerProps {
	symbol: ChartingLibraryWidgetOptions.symbol;
	interval: ChartingLibraryWidgetOptions.interval;

	// BEWARE: no trailing slash is expected in feed URL
	datafeedUrl: string;
	libraryPath: ChartingLibraryWidgetOptions.library_path;
	chartsStorageUrl: ChartingLibraryWidgetOptions.charts_storage_url;
	chartsStorageApiVersion: ChartingLibraryWidgetOptions.charts_storage_api_version;
	clientId: ChartingLibraryWidgetOptions.client_id;
	userId: ChartingLibraryWidgetOptions.user_id;
	fullscreen: ChartingLibraryWidgetOptions.fullscreen;
	autosize: ChartingLibraryWidgetOptions.autosize;
	studiesOverrides: ChartingLibraryWidgetOptions.studies_overrides;
	containerId: ChartingLibraryWidgetOptions.container_id;
}

export interface ChartContainerState {
}

function getLanguageFromURL(): LanguageCode | null {
	const regex = new RegExp('[\\?&]lang=([^&#]*)');
	const results = regex.exec(location.search);
	return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

const TVChartContainer = () => {

	const [props, setProps] = React.useState<ChartContainerProps>({
		symbol: 'AAPL',
		interval: 'D',
		containerId: 'tv_chart_container',
		datafeedUrl: 'https://demo_feed.tradingview.com',
		libraryPath: '/charting_library/',
		chartsStorageUrl: 'https://saveload.tradingview.com',
		chartsStorageApiVersion: '1.1',
		clientId: 'tradingview.com',
		userId: 'public_user_id',
		fullscreen: false,
		autosize: true,
		studiesOverrides: {},
	});

	React.useEffect(() => {
		const widgetOptions: ChartingLibraryWidgetOptions = {
			symbol: props.symbol,
			// BEWARE: no trailing slash is expected in feed URL
			// tslint:disable-next-line:no-any
			datafeed: new window.Datafeeds.UDFCompatibleDatafeed(props.datafeedUrl),
			interval: props.interval,
			container_id: props.containerId,
			library_path: props.libraryPath,
	
			locale: getLanguageFromURL() || 'en',
			disabled_features: ['use_localstorage_for_settings'],
			enabled_features: ['study_templates'],
			charts_storage_url: props.chartsStorageUrl,
			charts_storage_api_version: props.chartsStorageApiVersion,
			client_id: props.clientId,
			user_id: props.userId,
			fullscreen: props.fullscreen,
			autosize: props.autosize,
			studies_overrides: props.studiesOverrides,
		};
	
		const tvWidget = new widget(widgetOptions);
	
		tvWidget.onChartReady(() => {
			tvWidget.headerReady().then(() => {
				const button = tvWidget.createButton();
				button.setAttribute('title', 'Click to show a notification popup');
				button.classList.add('apply-common-tooltip');
				button.addEventListener('click', () => tvWidget.showNoticeDialog({
						title: 'Notification',
						body: 'TradingView Charting Library API works correctly',
						callback: () => {
							console.log('Noticed!');
						},
					}));
				button.innerHTML = 'Check API';
			});
		});
	}, []);

	return (
		<div
			id={ props.containerId }
			className={ 'TVChartContainer' }
		/>
	)
}

export default TVChartContainer;