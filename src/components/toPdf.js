import { usePDF} from 'react-to-pdf';
import Table from "./Table";

/**
 * For downloading the created work table in PDF form.
 */

export default function Pdf() {
    const { toPDF, targetRef } = usePDF({filename: 'page.pdf'});
    return (
        <div>
            <button onClick={() => toPDF()}>Download PDF</button>
            <div ref={targetRef}>
                <Table></Table>
            </div>
        </div>
    )
}