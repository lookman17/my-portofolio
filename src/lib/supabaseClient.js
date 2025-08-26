import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jqwiiakvlddjlakvuqkm.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impxd2lpYWt2bGRkamxha3Z1cWttIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYwOTM5MTMsImV4cCI6MjA3MTY2OTkxM30.yQOgnNFoTJ9sqo2VqXE2nEGYnHhG22b6gbsahzfFoiY'

export const supabase = createClient(supabaseUrl, supabaseKey)
