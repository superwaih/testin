import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "./api";

interface BankAccount{
    bank_code: string;
    account_name: string;
    account_number: string;
    bank_name: string;    
}
const addBankAccount = async (data: BankAccount) => {
    const response = await api.post("/partnerportal/create-bank-account/", data)
    return response.data
}


export const useAddBankAccount = () => {
    const queryclient = useQueryClient()
    return useMutation({
        mutationFn: addBankAccount,
        mutationKey: ['addBank'],
        onSuccess: () => {
            queryclient.invalidateQueries({queryKey: ['getBank']})
        }
    })
}


const getPartnerBankAccounts = async () => {
    const response = await api.get("/partnerportal/bank-account-details/")
    return response.data
}

export const useGetPartnerBankAccount = () => {
    return useQuery({
        queryFn: getPartnerBankAccounts,
        queryKey: ['getBank']
    })
}


const partnerTotalRevenue = async() => {
    const response = await api.get("/partnerportal/total-revenue-generated/")
    return response.data
}

export const useGetPartnerTotalRevenue = () => {
    return useQuery({
        queryFn: partnerTotalRevenue,
        queryKey: ['getRevenue']
    })
}

const partnerCurrentRevenue = async () => {
    const response = await api.get('/partnerportal/current-revenue/')
    return response.data
}

export const usePartnerCurrentRevenue = () => {
    return useQuery({
        queryFn: partnerCurrentRevenue,
        queryKey: ['getEarnings']
    })
}


const getAllBanks = async () => {
    const response = await api.get('/billing/banks/')
    return response.data
}

export const useGetAllBanks = () => {
    return useQuery({
        queryFn: getAllBanks,
        queryKey: ['getBanks']
    })
}


const getBusinessReferred = async () =>{
    const response = await api.get('/partnerportal/total-business-referred/')
    return response.data
}

export const useGetBuinessReferred = () => {
    return useQuery({
        queryFn: getBusinessReferred,
        queryKey: ['getBusiness']
    })
}