import * as React from 'react';
import cn from 'classnames'

export default function Video(data) {
    const { youtubeId } = data;
    const autopaly = data.open ? '1' : 0
    return (
        <div
            className={cn('video', { video__open: data.open })}
        >
            <iframe className="video__iframe"
                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=${autopaly}`}
                frameBorder="0"
            />
        </div>
    );
}
