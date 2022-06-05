import VideoClicksEventSource from "./video-clicks-event-source";

declare global {
    interface Window {
        video_clicks_event_source: VideoClicksEventSource;
        onYouTubeIframeAPIReady: () => void;
    }
}
