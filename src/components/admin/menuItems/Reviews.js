import * as React from 'react'
import {
  CreateButton,
  List,
  Create,
  Edit,
  SimpleForm,
  TopToolbar,
  Button,
  Datagrid,
  TextField,
  TextInput,
  DateInput,
  DateField,
  EditButton,
  Show,
  SimpleShowLayout,
  DeleteButton,
  ListButton,
  RichTextField,
  ShowButton,
  DisabledInput,
  BooleanInput,
  ReferenceField,
  LongTextInput,
  ReferenceManyField
} from 'react-admin'

export const ReviewShow = props => (
  <Show actions={<ReviewActions />} {...props}>
    <SimpleShowLayout>
      <ReferenceField
        link='show'
        label='Product'
        reference='admin-products'
        source='product'
      >
        <TextField source='name' />
      </ReferenceField>
      <ReferenceField
        link='show'
        label='User'
        reference='admin-users'
        source='user'
      >
        <TextField source='name' />
      </ReferenceField>
      <TextField label='Review ID' source='id' />
      <TextField label='Stars' source='stars' />
      <TextField label='Comment' source='review' />
    </SimpleShowLayout>
  </Show>
)

export const ReviewList = props => (
  <List {...props} bulkActionButtons={false}>
    <Datagrid rowClick='show'>
      <ReferenceField
        link='false'
        label='Product'
        reference='admin-products'
        source='product'
      >
        <TextField source='name' />
      </ReferenceField>
      <ReferenceField
        label='User'
        link='show'
        source='user'
        reference='admin-users'
      >
        <TextField label='Name' source='name' />
      </ReferenceField>
      <TextField label='Stars' source='stars' />
      <DateField label='Created' source='date' />

      <ShowButton />
    </Datagrid>
  </List>
)

//custom comps
const ReviewActions = ({ permissions, basePath, data, resource }) => (
  <TopToolbar>
    <ListButton basePath={basePath} record={data} />
    {/* Add your custom actions */}
  </TopToolbar>
)

