import {PDFDocumentProxy} from "pdfjs-dist";
import * as pdfjsLib from "pdfjs-dist";
import "./lecture-notes-viewer";

export interface LectureNotes {
    pdf_document: PDFDocumentProxy;
    youtube_video_id: string;
}

export async function load_lecture_notes(pdf_file: string): Promise<LectureNotes> {
    let loadingTask = pdfjsLib.getDocument({
        url: pdf_file,
        cMapUrl: "pdfsjs/cmaps",
        cMapPacked: true
    });

    let pdf_document: PDFDocumentProxy = await loadingTask.promise;
    let metadata = await pdf_document.getMetadata();
    let youtube_video_id = (metadata.info as any)['Custom']['YouTubeVideoId'];

    return {
        pdf_document,
        youtube_video_id
    };
}
