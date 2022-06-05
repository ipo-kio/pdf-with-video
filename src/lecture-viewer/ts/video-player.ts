export async function load_player_api(): Promise<void> {
    return new Promise((resolve, reject) => {
        const tag = document.createElement('script');

        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        window.onYouTubeIframeAPIReady = () => resolve();
    });
}

export class VideoPlayer {
    player: YT.Player;

    constructor(video_id: string, element_id: string) {
        this.player = new YT.Player(element_id, {
            height: '360',
            width: '640',
            videoId: video_id,
            events: {
                // 'onReady': () => {console.log('player ready!')},
                // 'onStateChange': onPlayerStateChange
            }
        });
    }

    goto(time: number) {
        this.player.seekTo(time, true);
    }
}
