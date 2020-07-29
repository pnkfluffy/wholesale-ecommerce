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
  DisabledInput, BooleanInput, ReferenceField,
  LongTextInput, ReferenceManyField,
} from 'react-admin'

export const ReviewShow = (props) => (
  <Show actions={< ReviewActions />} {...props}>
      <SimpleShowLayout>
        <ReferenceField link="show" label="Product" reference="admin-products" source="product">
            <TextField source="name"/>
        </ReferenceField>
        <ReferenceField link="show" label="User" reference="admin-users" source="user">
            <TextField source="name"/>
        </ReferenceField>
        <TextField label="Stars" source="stars"/>
        <TextField label="Comment" source="review"/>
        <TextField label="User" source="userName"/>
        <TextField label="Review ID" source="id"/>
      </SimpleShowLayout>
  </Show>
);

export const ReviewList = props => (
    <List {...props}>
        <Datagrid rowClick='show'>
          <ReferenceField link="false" label="Product" reference="admin-products" source="product">
            <TextField source="name"/>
          </ReferenceField>
          <TextField label="Customer" source="userName"/>
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