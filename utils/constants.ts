import { format } from "date-fns";

export const formatDate = (date: string) =>{
    if (!date) return "N/A"; // Handle undefined, null, or empty string
  
    const clean_date = new Date(date)
   const formated = clean_date ?  format(clean_date, "MMM d, yyyy hh:mm a") : 'N/A'
  return formated
  
  }

  export function formatPrice(price: number): string {
    return new Intl.NumberFormat('en-US').format(price);
  }
  export function formatBalance(price: number): string {
    if (price === 0) {
      return '0.00';
    }
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  }