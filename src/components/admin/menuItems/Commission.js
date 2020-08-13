import * as React from 'react'
import { Link } from 'react-router-dom'
import { stringify } from 'query-string'
import {
  CreateButton,
  ArrayField,
  List,
  Create,
  ReferenceInput,
  ReferenceField,
  Edit,
  SimpleForm,
  NumberField,
  TopToolbar,
  Button,
  Datagrid,
  TextField,
  TextInput,
  DateInput,
  ArrayInput,
  NumberInput,
  DateField,
  EditButton,
  Show,
  SimpleShowLayout,
  DeleteButton,
  AutocompleteInput,
  ListButton,
  RichTextField,
  ShowButton,
  DisabledInput,
  BooleanInput,
  LongTextInput,
  ReferenceManyField,
  FunctionField,
  basePath,
  useListContext,
  sanitizeListRestProps,
  Typography,
  Filter,
  SearchInput
} from 'react-admin'

export const CommissionList = props => (
  // <ReferenceManyField label={false} reference='admin-users' target='id'>
  <List
    aside={<Aside />}
    filters={<CommissionFilter />}
    actions={<ListActions />}
    filterDefaultValues={{ commission: true }}
    bulkActionButtons={false}
    sort={{ field: 'date', order: 'DESC' }}
    {...props}
  >
    <Datagrid rowClick='show'>
      <ReferenceField
        label='User'
        link='show'
        source='user'
        reference='admin-users'
      >
        <TextField label='Name' source='name' />
      </ReferenceField>

      <ReferenceField
        label='Representative'
        source='representative'
        reference='admin-users'
        link='show'
      >
        <TextField label='Name' source='name' />
      </ReferenceField>
      <NumberField
        label='Total'
        source='total'
        options={{ style: 'currency', currency: 'USD' }}
      />
      <DateField label='Date' source='date' />
      <ShowButton />
    </Datagrid>
  </List>
  // </ReferenceManyField>
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

const CommissionFilter = props => {
  return (
    <Filter {...props}>
      <BooleanInput
        source='representative'
        label='My Sales'
        alwaysOn
        style={{ display: 'none' }}
      />
    </Filter>
  )
}

const Aside = ({ data, ids }) => {
  // // console.log('aside', data, ids)
  let totalSpending = ids.map(id => data[id].total).reduce((orderCost, total) => orderCost + total, 0)
  return (
    <div style={{ width: 200, margin: '1vw' }}>
      <h1>Customer Spending</h1>
      <p>pulled from current list</p>
      <div>
        ${' '}
        {totalSpending.toFixed(2)}
      </div>
    </div>
  )
}

export const CommissionShow = props => (
  <Show actions={<CommissionShowActions />} {...props}>
    <SimpleShowLayout>
      <ReferenceField label='User Email' source='user' reference='admin-users'>
        <TextField label='email' source='email' />
      </ReferenceField>
      <ReferenceField label='User Name' source='user' reference='admin-users'>
        <TextField label='Name' source='name' />
      </ReferenceField>
      <ReferenceField
        label='Representative'
        link='show'
        source='representative'
        reference='admin-users'
      >
        <TextField label='Name' source='name' />
      </ReferenceField>
      <TextField label='Order ID' source='id' />
      <ArrayField label='Products Ordered' source='products'>
        <Datagrid rowClick='show'>
          <ReferenceField
            label='Product'
            source='productId'
            reference='admin-products'
          >
            <TextField label='Product' source='name' />
          </ReferenceField>
          <NumberField label='Quantity' source='productQuantity' />
          <NumberField
            label='Price Per Unit'
            options={{ style: 'currency', currency: 'USD' }}
            source='productPrice'
          />
          <NumberField
            label='Final Price'
            options={{ style: 'currency', currency: 'USD' }}
            source='productTotal'
          />
        </Datagrid>
      </ArrayField>
      <NumberField
        label='Order Total'
        source='total'
        options={{ style: 'currency', currency: 'USD' }}
      />
      <h2>Tracking Information</h2>
      <TextField label='Shipping Company' source='tracking.company' />
      <TextField label='Tracking Number' source='tracking.number' />
    </SimpleShowLayout>
  </Show>
)

//custom comps
const CommissionShowActions = ({ basePath, data, resource }) => (
  <TopToolbar>
    <ListButton basePath={basePath} record={data} />
    {/* Add your custom actions */}
  </TopToolbar>
)
