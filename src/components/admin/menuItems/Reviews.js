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
  sanitizeListRestProps,
  useListContext,
} from 'react-admin'


export const ReviewList = ({ permissions, ...props}) => (
  <List
    {...props}
    actions={<ListActions />}
    sort={{ field: 'date', order: 'DESC' }}
    bulkActionButtons={false}
  >
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

const ListActions = props => {
  const { className, exporter, filters, maxResults, ...rest } = props
  const {
    basePath,
    resource,
    showFilter,
    displayedFilters,
    filterValues
  } = useListContext()
  return (
    <TopToolbar className={className} {...sanitizeListRestProps(rest)}>
      {filters &&
        React.cloneElement(filters, {
          resource,
          showFilter,
          displayedFilters,
          filterValues,
          context: 'button'
        })}
      {/* <CreateButton basePath={basePath} /> */}
    </TopToolbar>
  )
}

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

//custom comps
const ReviewActions = ({ permissions, basePath, data, resource }) => (
  <TopToolbar>
    <ListButton basePath={basePath} record={data} />
    {/* Add your custom actions */}
  </TopToolbar>
)
