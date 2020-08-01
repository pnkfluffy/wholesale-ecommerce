import * as React from 'react'
import { OrderList } from './Orders'
import {
  List,
  Create,
  Edit,
  SimpleForm,
  ArrayField,
  DisabledInput,
  BooleanInput,
  BooleanField,
  TextInput,
  DateInput,
  ReferenceField,
  ReferenceManyField,
  LongTextInput,
  Datagrid,
  TextField,
  DateField,
  EditButton,
  Show,
  SimpleShowLayout,
  RichTextField,
  ShowButton,
  TopToolbar,
  Button,
  DeleteButton,
  ListButton,
  CreateButton,
  useQuery,
  Loading,
  Error,
  SingleFieldList,
  ChipField,
  ArrayInput,
  SimpleFormIterator,
  NumberInput,
  NumberField
} from 'react-admin'

export const UserShow = props => {
  return (
    <Show actions={<UserShowActions />} {...props}>
      <SimpleShowLayout>
        <TextField label='User Email' source='email' />
        <TextField label='Full Name' source='name' />
        <BooleanField
          label='is admin?'
          source='isAdmin'
        />
        <TextField label='Payment confirmed' source='paymentVerified' />
        <ArrayField label='Favorites' source='favorites'>
          <Datagrid>
            <TextField label='ID' source='id' />
            <TextField label='Product Name' source='name' />
            <TextField label='Category' source='category' />
            <TextField label='Price' source='price' />
          </Datagrid>
        </ArrayField>
        <ReferenceManyField
          label='Order History'
          source='id'
          reference='admin-orders'
          target='user'
          link='show'
        >
          <Datagrid rowClick='show'>
            <TextField label='Total' source='total' />
            <TextField label='Date' source='date' />
            <TextField label='Product Purchased' source='products.length' />
          </Datagrid>
        </ReferenceManyField>
        <ReferenceManyField
          label='Reviews Written by this User'
          source='id'
          target='user'
          reference='admin-reviews'
          link='show'
        >
          <Datagrid>
            <ReferenceField
              label='Product'
              reference='admin-products'
              source='product'
            >
              <TextField source='name' />
            </ReferenceField>
            <NumberField label='Rating' source='stars' />
          </Datagrid>
        </ReferenceManyField>
        <TextField label='Database ID' source='id' />
        <TextField label='Google ID' source='googleID' />
        <TextField label='goCardless ID' source='goCardlessID' />
      </SimpleShowLayout>
    </Show>
  )
}

export const UserList = props => (
  <List {...props}>
    <Datagrid rowClick='show'>
      <TextField label='User Email' source='email' />
      <TextField label='Database ID' source='id' />
      <BooleanField
        label='is admin?'
        source='isAdmin'
      />
      <ShowButton />
      <DeleteButton />
    </Datagrid>
  </List>
)

export const UserEdit = props => (
  <Edit
    undoable={false}
    title={<UserTitle />}
    actions={<UserEditActions />}
    {...props}
  >
    <SimpleForm>
      <TextField disabled label='ID' source='id' />
      <TextField disabled label='email' source='email' />
      <TextInput label='name' source='name' />
      <BooleanInput
        disabled
        label='Payment Verified'
        source='paymentVerified'
      />
      <TextInput disabled label='goCardless ID' source='goCardlessID' />
      <ArrayInput label='Cart' source='cart'>
        <SimpleFormIterator>
          <TextInput disabled label='Product' source='product' />
          <NumberInput label='Quantity' source='quantity' />
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  </Edit>
)

export const UserCreate = props => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput label='User Email' source='email' />
        <TextInput label='Full Name' source='name' />
        <BooleanInput
          label='Make Admin User'
          source='isAdmin'
        />
      </SimpleForm>
    </Create>
  )
}

// custom components

const UserTitle = ({ record }) => {
  return <span>Post {record ? `"${record.name}"` : ''}</span>
}

const UserShowActions = ({ basePath, data, resource }) => (
  <TopToolbar>
    <EditButton basePath={basePath} record={data} />
    <DeleteButton basePath={basePath} record={data} />
    <ListButton basePath={basePath} record={data} />
  </TopToolbar>
)
const UserEditActions = ({ basePath, data, resource }) => (
  <TopToolbar>
    <ShowButton basePath={basePath} record={data} />
    <DeleteButton basePath={basePath} record={data} />
    <ListButton basePath={basePath} record={data} />
  </TopToolbar>
)
