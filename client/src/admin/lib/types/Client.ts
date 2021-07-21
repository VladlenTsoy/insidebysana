import { Source } from "./Source";

export interface Client {
  id: number
  source_id: number
  full_name: string
  phone: string
  email: string
  instagram: string
  facebook: string
  telegram: string
  date_of_birth: string
  source: Source
  created_at: string
}