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
  NumberField,
  Toolbar,
  SaveButton
} from 'react-admin'

export const UserList = ({permissions, ...props}) => (
  <List {...props} sort={{ field: 'date', order: 'DESC' }} bulkActionButtons={false}>
    <Datagrid rowClick='show'>
      <TextField label='User' source='name' />
      <TextField label='Email' source='email' />
      <ReferenceField
        label='Representative'
        link='show'
        source='representative'
        reference='admin-users'
      >
        <TextField label='Name' source='name' />
      </ReferenceField>
      {/* <TextField label='Database ID' source='id' /> */}
      <BooleanField label='Is Admin' source='isAdmin' />
      <DateField label='Created' source='date' />
      <ShowButton basePath={props.basePath} record={props.data} />
      {permissions === 'owner' && <DeleteButton />}
    </Datagrid>
  </List>
)

export const UserShow = props => {
  return (
    <Show actions={<UserShowActions />} {...props}>
      <SimpleShowLayout>
        <TextField label='Name' source='name' />
        <TextField label='Email' source='email' />
        <TextField label='Database ID' source='id' />
        <BooleanField label='is admin?' source='isAdmin' />
        <ReferenceField
          label='Representative'
          link='show'
          source='representative'
          reference='admin-users'
        >
          <TextField label='Name' source='email' />
        </ReferenceField>
        <TextField label='Payment confirmed' source='paymentVerified' />
        <ArrayField label='Wishlist' source='wishlist'>
          <ReferenceField label='Product' reference='admin-products'>
            <TextField label='Product' source='name' />
          </ReferenceField>
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
        <TextField label='goCardless ID' source='goCardlessID' />
      </SimpleShowLayout>
    </Show>
  )
}

export const UserEdit = props => (
  <Edit
    undoable={false}
    title={<UserTitle />}
    actions={<UserEditActions />}
    {...props}
  >
    <SimpleForm toolbar={<UserEditToolbar />}> 
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
        <BooleanInput label='Make Admin User' source='isAdmin' />
        <BooleanInput
          label='Make Me User Representative'
          source='makeRepresentative'
          initialValue={true}
        />
        <p>
          The user will be automatically emailed with a randomly generated
          password. This password can be changed by the user.
        </p>
      </SimpleForm>
    </Create>
  )
}

// custom components

const UserTitle = ({ record }) => {
  return <span>Post {record ? `"${record.name}"` : ''}</span>
}

const UserShowActions = ({ permissions, basePath, data, resource }) => (
  <TopToolbar>
    <EditButton basePath={basePath} record={data} />
    {permissions === 'owner' && <DeleteButton basePath={basePath} record={data} />}
    <ListButton basePath={basePath} record={data} />
  </TopToolbar>
)
const UserEditActions = ({ permissions, basePath, data, resource }) => (
  <TopToolbar>
    <ShowButton basePath={basePath} record={data} />
    {permissions === 'owner' && <DeleteButton basePath={basePath} record={data} />}
    <ListButton basePath={basePath} record={data} />
  </TopToolbar>
)

const UserEditToolbar = props => (
  <Toolbar {...props} >
      <SaveButton />
  </Toolbar>
);