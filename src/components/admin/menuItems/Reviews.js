import * as React from 'react'
import {
  CreateButton,
  List, Create,
  Edit, SimpleForm,
  TopToolbar, Button,
  Datagrid, TextField,
  TextInput, DateInput,
  DateField, EditButton,
  Show, SimpleShowLayout,
  DeleteButton, ListButton,
  RichTextField, ShowButton,
  DisabledInput, BooleanInput,
  LongTextInput, ReferenceManyField,
} from 'react-admin'

export const ReviewShow = (props) => (
  <Show actions={< ReviewActions />} {...props}>
      <SimpleShowLayout>
        <TextField label="Product" source="product"/>
        <TextField label="Stars" source="stars"/>
        <TextField label="Comment" source="review"/>
        <TextField label="User" source="userName"/>
        <TextField label="User ID" source="user"/>
        <TextField label="Review ID" source="id"/>
      </SimpleShowLayout>
  </Show>
);

export const ReviewList = props => (
    <List {...props}>
        <Datagrid rowClick='show'>
          {/* <TextField label='ID' source='id' /> */}
          <TextField label="Product" source="product" />
          <TextField label="Stars" source="stars" />
          < ShowButton />
          < DeleteButton />
        </Datagrid>
      </List>
    )

//custom comps
const ReviewActions = ({ basePath, data, resource }) => (
  <TopToolbar>
    <EditButton basePath={basePath} record={data} />
    <DeleteButton basePath={basePath} record={data} />
    < ListButton basePath={basePath} record={data} />
      {/* Add your custom actions */}
  </TopToolbar>
);