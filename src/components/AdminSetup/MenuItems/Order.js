import * as React from 'react'
import {
  List, Create,
  Edit, SimpleForm,
  DisabledInput, BooleanInput,
  TextInput, DateInput,
  LongTextInput, ReferenceManyField,
  Datagrid, TextField,
  DateField, EditButton,
  Show, SimpleShowLayout,
  RichTextField, ShowButton,
  TopToolbar, Button,
  DeleteButton, ListButton,
  CreateButton
} from 'react-admin'

export const OrderList = props => (
    <List {...props}>
        <Datagrid rowClick='show'>
          {/* <TextField label='ID' source='id' /> */}
          <TextField label='Name' source='name' />
          < ShowButton />
          < EditButton />
          < DeleteButton />
        </Datagrid>
      </List>
    )