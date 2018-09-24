import React from 'react';
import { List, Datagrid, TextField } from 'react-admin';
import { compose, withProps, withState, lifecycle, branch, renderNothing } from 'recompose'

const ExpositionsList = () => (
    <List>
        <Datagrid>
            <TextField source="description" />
        </Datagrid>
    </List>
)

export default compose()(ExpositionsList)
