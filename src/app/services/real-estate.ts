import {RealEstate} from '@prisma/client'
import {api} from './api'

export const realEstateApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllRealEstates: builder.query<RealEstate[], void>({
      query: (employeeId) => ({
        url: `/real-estate/${employeeId}`,
        method: 'GET',
      })
    }),
    getRealEstate: builder.query<RealEstate, string>({
      query: (id) => ({
        url: `/employees/${id}`,
        method: 'GET',
      })
    }),
    editRealEstate: builder.mutation<string, RealEstate>({
      query: (employee) => ({
        url: `/employees/edit/${employee.id}`,
        method: 'PUT',
        body: employee
      })
    }),
    deleteRealEstate: builder.mutation<string, string>({
      query: (id) => ({
        url: `/employees/remove/${id}`,
        method: 'POST',
        body: { id }
      })
    }),
    addRealEstate: builder.mutation<RealEstate, RealEstate>({
      query: (employee) => ({
        url: '/employees/add',
        method: 'POST',
        body: employee
      })
    })
  })
})

export const {  
  useGetAllRealEstatesQuery, 
  useGetRealEstateQuery,
  useEditRealEstateMutation, 
  useDeleteRealEstateMutation, 
  useAddRealEstateMutation
 } = realEstateApi

export const {endpoints: {
  getAllRealEstates, 
  getRealEstate, 
  editRealEstate, 
  deleteRealEstate, 
  addRealEstate
}} = realEstateApi