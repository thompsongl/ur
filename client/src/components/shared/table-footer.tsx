import { Table } from '@radix-ui/themes';
import * as React from 'react';
import './table-footer.css'

export const TableFooter: React.FC<React.PropsWithChildren> = ({children}) => {
    return (
        <tfoot className="table-footer">
            <Table.Row align="center">
                <Table.Cell justify="end" colSpan={4} className="table-footer__cell">
                    {children}
                </Table.Cell>
            </Table.Row>
        </tfoot>
    )
}