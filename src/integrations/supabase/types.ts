export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      bro: {
        Row: {
          created_at: string
          id: number
        }
        Insert: {
          created_at?: string
          id?: number
        }
        Update: {
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      copy: {
        Row: {
          answer: string | null
          calculation_required: string | null
          calculator_allowed: boolean | null
          checked: boolean | null
          code: string | null
          corrected: boolean | null
          difficulty: string | null
          problem_image: string | null
          problem_number: number | null
          problem_text: string | null
          question_id: string
          rec_time: string | null
          skills: string | null
          skills_for_step_1: string | null
          skills_for_step_10: string | null
          skills_for_step_11: string | null
          skills_for_step_12: string | null
          skills_for_step_13: string | null
          skills_for_step_14: string | null
          skills_for_step_15: string | null
          skills_for_step_2: string | null
          skills_for_step_3: string | null
          skills_for_step_4: string | null
          skills_for_step_5: string | null
          skills_for_step_6: string | null
          skills_for_step_7: string | null
          skills_for_step_8: string | null
          skills_for_step_9: string | null
          solution_text: string | null
          solutiontextexpanded: string | null
          source: string | null
          step1_expanded_text: string | null
          step1_text: string | null
          step10_expanded_text: string | null
          step10_text: string | null
          step11_expanded_text: string | null
          step11_text: string | null
          step12_expanded_text: string | null
          step12_text: string | null
          step13_expanded_text: string | null
          step13_text: string | null
          step14_expanded_text: string | null
          step14_text: string | null
          step15_expanded_text: string | null
          step15_text: string | null
          step2_expanded_text: string | null
          step2_text: string | null
          step3_expanded_text: string | null
          step3_text: string | null
          step4_expanded_text: string | null
          step4_text: string | null
          step5_expanded_text: string | null
          step5_text: string | null
          step6_expanded_text: string | null
          step6_text: string | null
          step7_expanded_text: string | null
          step7_text: string | null
          step8_expanded_text: string | null
          step8_text: string | null
          step9_expanded_text: string | null
          step9_text: string | null
          steps_number: number | null
          type: string | null
        }
        Insert: {
          answer?: string | null
          calculation_required?: string | null
          calculator_allowed?: boolean | null
          checked?: boolean | null
          code?: string | null
          corrected?: boolean | null
          difficulty?: string | null
          problem_image?: string | null
          problem_number?: number | null
          problem_text?: string | null
          question_id: string
          rec_time?: string | null
          skills?: string | null
          skills_for_step_1?: string | null
          skills_for_step_10?: string | null
          skills_for_step_11?: string | null
          skills_for_step_12?: string | null
          skills_for_step_13?: string | null
          skills_for_step_14?: string | null
          skills_for_step_15?: string | null
          skills_for_step_2?: string | null
          skills_for_step_3?: string | null
          skills_for_step_4?: string | null
          skills_for_step_5?: string | null
          skills_for_step_6?: string | null
          skills_for_step_7?: string | null
          skills_for_step_8?: string | null
          skills_for_step_9?: string | null
          solution_text?: string | null
          solutiontextexpanded?: string | null
          source?: string | null
          step1_expanded_text?: string | null
          step1_text?: string | null
          step10_expanded_text?: string | null
          step10_text?: string | null
          step11_expanded_text?: string | null
          step11_text?: string | null
          step12_expanded_text?: string | null
          step12_text?: string | null
          step13_expanded_text?: string | null
          step13_text?: string | null
          step14_expanded_text?: string | null
          step14_text?: string | null
          step15_expanded_text?: string | null
          step15_text?: string | null
          step2_expanded_text?: string | null
          step2_text?: string | null
          step3_expanded_text?: string | null
          step3_text?: string | null
          step4_expanded_text?: string | null
          step4_text?: string | null
          step5_expanded_text?: string | null
          step5_text?: string | null
          step6_expanded_text?: string | null
          step6_text?: string | null
          step7_expanded_text?: string | null
          step7_text?: string | null
          step8_expanded_text?: string | null
          step8_text?: string | null
          step9_expanded_text?: string | null
          step9_text?: string | null
          steps_number?: number | null
          type?: string | null
        }
        Update: {
          answer?: string | null
          calculation_required?: string | null
          calculator_allowed?: boolean | null
          checked?: boolean | null
          code?: string | null
          corrected?: boolean | null
          difficulty?: string | null
          problem_image?: string | null
          problem_number?: number | null
          problem_text?: string | null
          question_id?: string
          rec_time?: string | null
          skills?: string | null
          skills_for_step_1?: string | null
          skills_for_step_10?: string | null
          skills_for_step_11?: string | null
          skills_for_step_12?: string | null
          skills_for_step_13?: string | null
          skills_for_step_14?: string | null
          skills_for_step_15?: string | null
          skills_for_step_2?: string | null
          skills_for_step_3?: string | null
          skills_for_step_4?: string | null
          skills_for_step_5?: string | null
          skills_for_step_6?: string | null
          skills_for_step_7?: string | null
          skills_for_step_8?: string | null
          skills_for_step_9?: string | null
          solution_text?: string | null
          solutiontextexpanded?: string | null
          source?: string | null
          step1_expanded_text?: string | null
          step1_text?: string | null
          step10_expanded_text?: string | null
          step10_text?: string | null
          step11_expanded_text?: string | null
          step11_text?: string | null
          step12_expanded_text?: string | null
          step12_text?: string | null
          step13_expanded_text?: string | null
          step13_text?: string | null
          step14_expanded_text?: string | null
          step14_text?: string | null
          step15_expanded_text?: string | null
          step15_text?: string | null
          step2_expanded_text?: string | null
          step2_text?: string | null
          step3_expanded_text?: string | null
          step3_text?: string | null
          step4_expanded_text?: string | null
          step4_text?: string | null
          step5_expanded_text?: string | null
          step5_text?: string | null
          step6_expanded_text?: string | null
          step6_text?: string | null
          step7_expanded_text?: string | null
          step7_text?: string | null
          step8_expanded_text?: string | null
          step8_text?: string | null
          step9_expanded_text?: string | null
          step9_text?: string | null
          steps_number?: number | null
          type?: string | null
        }
        Relationships: []
      }
      new_problems_by_skills_1: {
        Row: {
          answer: string | null
          calculation_required: string | null
          calculator_allowed: string | null
          checked: boolean | null
          code: string | null
          corrected: boolean | null
          difficulty: number | null
          problem_image: string | null
          problem_number: number | null
          problem_text: string | null
          question_id: string
          rec_time: string | null
          skills: number | null
          skills_for_step_1: string | null
          skills_for_step_10: string | null
          skills_for_step_11: string | null
          skills_for_step_12: string | null
          skills_for_step_13: string | null
          skills_for_step_14: string | null
          skills_for_step_15: string | null
          skills_for_step_2: string | null
          skills_for_step_3: string | null
          skills_for_step_4: string | null
          skills_for_step_5: string | null
          skills_for_step_6: string | null
          skills_for_step_7: string | null
          skills_for_step_8: string | null
          skills_for_step_9: string | null
          solution_text: string | null
          solutiontextexpanded: string | null
          source: string | null
          step1_expanded_text: string | null
          step1_text: string | null
          step10_expanded_text: string | null
          step10_text: string | null
          step11_expanded_text: string | null
          step11_text: string | null
          step12_expanded_text: string | null
          step12_text: string | null
          step13_expanded_text: string | null
          step13_text: string | null
          step14_expanded_text: string | null
          step14_text: string | null
          step15_expanded_text: string | null
          step15_text: string | null
          step2_expanded_text: string | null
          step2_text: string | null
          step3_expanded_text: string | null
          step3_text: string | null
          step4_expanded_text: string | null
          step4_text: string | null
          step5_expanded_text: string | null
          step5_text: string | null
          step6_expanded_text: string | null
          step6_text: string | null
          step7_expanded_text: string | null
          step7_text: string | null
          step8_expanded_text: string | null
          step8_text: string | null
          step9_expanded_text: string | null
          step9_text: string | null
          steps_number: number | null
          type: string | null
        }
        Insert: {
          answer?: string | null
          calculation_required?: string | null
          calculator_allowed?: string | null
          checked?: boolean | null
          code?: string | null
          corrected?: boolean | null
          difficulty?: number | null
          problem_image?: string | null
          problem_number?: number | null
          problem_text?: string | null
          question_id: string
          rec_time?: string | null
          skills?: number | null
          skills_for_step_1?: string | null
          skills_for_step_10?: string | null
          skills_for_step_11?: string | null
          skills_for_step_12?: string | null
          skills_for_step_13?: string | null
          skills_for_step_14?: string | null
          skills_for_step_15?: string | null
          skills_for_step_2?: string | null
          skills_for_step_3?: string | null
          skills_for_step_4?: string | null
          skills_for_step_5?: string | null
          skills_for_step_6?: string | null
          skills_for_step_7?: string | null
          skills_for_step_8?: string | null
          skills_for_step_9?: string | null
          solution_text?: string | null
          solutiontextexpanded?: string | null
          source?: string | null
          step1_expanded_text?: string | null
          step1_text?: string | null
          step10_expanded_text?: string | null
          step10_text?: string | null
          step11_expanded_text?: string | null
          step11_text?: string | null
          step12_expanded_text?: string | null
          step12_text?: string | null
          step13_expanded_text?: string | null
          step13_text?: string | null
          step14_expanded_text?: string | null
          step14_text?: string | null
          step15_expanded_text?: string | null
          step15_text?: string | null
          step2_expanded_text?: string | null
          step2_text?: string | null
          step3_expanded_text?: string | null
          step3_text?: string | null
          step4_expanded_text?: string | null
          step4_text?: string | null
          step5_expanded_text?: string | null
          step5_text?: string | null
          step6_expanded_text?: string | null
          step6_text?: string | null
          step7_expanded_text?: string | null
          step7_text?: string | null
          step8_expanded_text?: string | null
          step8_text?: string | null
          step9_expanded_text?: string | null
          step9_text?: string | null
          steps_number?: number | null
          type?: string | null
        }
        Update: {
          answer?: string | null
          calculation_required?: string | null
          calculator_allowed?: string | null
          checked?: boolean | null
          code?: string | null
          corrected?: boolean | null
          difficulty?: number | null
          problem_image?: string | null
          problem_number?: number | null
          problem_text?: string | null
          question_id?: string
          rec_time?: string | null
          skills?: number | null
          skills_for_step_1?: string | null
          skills_for_step_10?: string | null
          skills_for_step_11?: string | null
          skills_for_step_12?: string | null
          skills_for_step_13?: string | null
          skills_for_step_14?: string | null
          skills_for_step_15?: string | null
          skills_for_step_2?: string | null
          skills_for_step_3?: string | null
          skills_for_step_4?: string | null
          skills_for_step_5?: string | null
          skills_for_step_6?: string | null
          skills_for_step_7?: string | null
          skills_for_step_8?: string | null
          skills_for_step_9?: string | null
          solution_text?: string | null
          solutiontextexpanded?: string | null
          source?: string | null
          step1_expanded_text?: string | null
          step1_text?: string | null
          step10_expanded_text?: string | null
          step10_text?: string | null
          step11_expanded_text?: string | null
          step11_text?: string | null
          step12_expanded_text?: string | null
          step12_text?: string | null
          step13_expanded_text?: string | null
          step13_text?: string | null
          step14_expanded_text?: string | null
          step14_text?: string | null
          step15_expanded_text?: string | null
          step15_text?: string | null
          step2_expanded_text?: string | null
          step2_text?: string | null
          step3_expanded_text?: string | null
          step3_text?: string | null
          step4_expanded_text?: string | null
          step4_text?: string | null
          step5_expanded_text?: string | null
          step5_text?: string | null
          step6_expanded_text?: string | null
          step6_text?: string | null
          step7_expanded_text?: string | null
          step7_text?: string | null
          step8_expanded_text?: string | null
          step8_text?: string | null
          step9_expanded_text?: string | null
          step9_text?: string | null
          steps_number?: number | null
          type?: string | null
        }
        Relationships: []
      }
      new_problems_by_skills_2: {
        Row: {
          answer: string | null
          calculation_required: string | null
          calculator_allowed: string | null
          checked: boolean | null
          code: string | null
          corrected: boolean | null
          difficulty: number | null
          problem_image: string | null
          problem_number: string | null
          problem_text: string | null
          question_id: string
          rec_time: string | null
          skills: number | null
          skills_for_step_1: string | null
          skills_for_step_10: string | null
          skills_for_step_11: string | null
          skills_for_step_12: string | null
          skills_for_step_13: string | null
          skills_for_step_14: string | null
          skills_for_step_15: string | null
          skills_for_step_2: string | null
          skills_for_step_3: string | null
          skills_for_step_4: string | null
          skills_for_step_5: string | null
          skills_for_step_6: string | null
          skills_for_step_7: string | null
          skills_for_step_8: string | null
          skills_for_step_9: string | null
          solution_text: string | null
          solutiontextexpanded: string | null
          source: string | null
          step1_expanded_text: string | null
          step1_text: string | null
          step10_expanded_text: string | null
          step10_text: string | null
          step11_expanded_text: string | null
          step11_text: string | null
          step12_expanded_text: string | null
          step12_text: string | null
          step13_expanded_text: string | null
          step13_text: string | null
          step14_expanded_text: string | null
          step14_text: string | null
          step15_expanded_text: string | null
          step15_text: string | null
          step2_expanded_text: string | null
          step2_text: string | null
          step3_expanded_text: string | null
          step3_text: string | null
          step4_expanded_text: string | null
          step4_text: string | null
          step5_expanded_text: string | null
          step5_text: string | null
          step6_expanded_text: string | null
          step6_text: string | null
          step7_expanded_text: string | null
          step7_text: string | null
          step8_expanded_text: string | null
          step8_text: string | null
          step9_expanded_text: string | null
          step9_text: string | null
          steps_number: number | null
          type: string | null
        }
        Insert: {
          answer?: string | null
          calculation_required?: string | null
          calculator_allowed?: string | null
          checked?: boolean | null
          code?: string | null
          corrected?: boolean | null
          difficulty?: number | null
          problem_image?: string | null
          problem_number?: string | null
          problem_text?: string | null
          question_id: string
          rec_time?: string | null
          skills?: number | null
          skills_for_step_1?: string | null
          skills_for_step_10?: string | null
          skills_for_step_11?: string | null
          skills_for_step_12?: string | null
          skills_for_step_13?: string | null
          skills_for_step_14?: string | null
          skills_for_step_15?: string | null
          skills_for_step_2?: string | null
          skills_for_step_3?: string | null
          skills_for_step_4?: string | null
          skills_for_step_5?: string | null
          skills_for_step_6?: string | null
          skills_for_step_7?: string | null
          skills_for_step_8?: string | null
          skills_for_step_9?: string | null
          solution_text?: string | null
          solutiontextexpanded?: string | null
          source?: string | null
          step1_expanded_text?: string | null
          step1_text?: string | null
          step10_expanded_text?: string | null
          step10_text?: string | null
          step11_expanded_text?: string | null
          step11_text?: string | null
          step12_expanded_text?: string | null
          step12_text?: string | null
          step13_expanded_text?: string | null
          step13_text?: string | null
          step14_expanded_text?: string | null
          step14_text?: string | null
          step15_expanded_text?: string | null
          step15_text?: string | null
          step2_expanded_text?: string | null
          step2_text?: string | null
          step3_expanded_text?: string | null
          step3_text?: string | null
          step4_expanded_text?: string | null
          step4_text?: string | null
          step5_expanded_text?: string | null
          step5_text?: string | null
          step6_expanded_text?: string | null
          step6_text?: string | null
          step7_expanded_text?: string | null
          step7_text?: string | null
          step8_expanded_text?: string | null
          step8_text?: string | null
          step9_expanded_text?: string | null
          step9_text?: string | null
          steps_number?: number | null
          type?: string | null
        }
        Update: {
          answer?: string | null
          calculation_required?: string | null
          calculator_allowed?: string | null
          checked?: boolean | null
          code?: string | null
          corrected?: boolean | null
          difficulty?: number | null
          problem_image?: string | null
          problem_number?: string | null
          problem_text?: string | null
          question_id?: string
          rec_time?: string | null
          skills?: number | null
          skills_for_step_1?: string | null
          skills_for_step_10?: string | null
          skills_for_step_11?: string | null
          skills_for_step_12?: string | null
          skills_for_step_13?: string | null
          skills_for_step_14?: string | null
          skills_for_step_15?: string | null
          skills_for_step_2?: string | null
          skills_for_step_3?: string | null
          skills_for_step_4?: string | null
          skills_for_step_5?: string | null
          skills_for_step_6?: string | null
          skills_for_step_7?: string | null
          skills_for_step_8?: string | null
          skills_for_step_9?: string | null
          solution_text?: string | null
          solutiontextexpanded?: string | null
          source?: string | null
          step1_expanded_text?: string | null
          step1_text?: string | null
          step10_expanded_text?: string | null
          step10_text?: string | null
          step11_expanded_text?: string | null
          step11_text?: string | null
          step12_expanded_text?: string | null
          step12_text?: string | null
          step13_expanded_text?: string | null
          step13_text?: string | null
          step14_expanded_text?: string | null
          step14_text?: string | null
          step15_expanded_text?: string | null
          step15_text?: string | null
          step2_expanded_text?: string | null
          step2_text?: string | null
          step3_expanded_text?: string | null
          step3_text?: string | null
          step4_expanded_text?: string | null
          step4_text?: string | null
          step5_expanded_text?: string | null
          step5_text?: string | null
          step6_expanded_text?: string | null
          step6_text?: string | null
          step7_expanded_text?: string | null
          step7_text?: string | null
          step8_expanded_text?: string | null
          step8_text?: string | null
          step9_expanded_text?: string | null
          step9_text?: string | null
          steps_number?: number | null
          type?: string | null
        }
        Relationships: []
      }
      OGE_SHFIPI_problems_1_25: {
        Row: {
          answer: string | null
          calculation_required: string | null
          calculator_allowed: boolean | null
          checked: boolean | null
          code: number | null
          corrected: boolean | null
          difficulty: string | null
          problem_image: string | null
          problem_number: string | null
          problem_text: string | null
          question_id: string
          rec_time: string | null
          skills: string | null
          skills_for_step_1: string | null
          skills_for_step_10: string | null
          skills_for_step_11: string | null
          skills_for_step_12: string | null
          skills_for_step_13: string | null
          skills_for_step_14: string | null
          skills_for_step_15: string | null
          skills_for_step_2: string | null
          skills_for_step_3: string | null
          skills_for_step_4: string | null
          skills_for_step_5: string | null
          skills_for_step_6: string | null
          skills_for_step_7: string | null
          skills_for_step_8: string | null
          skills_for_step_9: string | null
          solution_image: string | null
          solution_text: string | null
          solutiontextexpanded: string | null
          source: string | null
          step1_expanded_text: string | null
          step1_text: string | null
          step10_expanded_text: string | null
          step10_text: string | null
          step11_expanded_text: string | null
          step11_text: string | null
          step12_expanded_text: string | null
          step12_text: string | null
          step13_expanded_text: string | null
          step13_text: string | null
          step14_expanded_text: string | null
          step14_text: string | null
          step15_expanded_text: string | null
          step15_text: string | null
          step2_expanded_text: string | null
          step2_text: string | null
          step3_expanded_text: string | null
          step3_text: string | null
          step4_expanded_text: string | null
          step4_text: string | null
          step5_expanded_text: string | null
          step5_text: string | null
          step6_expanded_text: string | null
          step6_text: string | null
          step7_expanded_text: string | null
          step7_text: string | null
          step8_expanded_text: string | null
          step8_text: string | null
          step9_expanded_text: string | null
          step9_text: string | null
          steps_number: number | null
          type: string | null
        }
        Insert: {
          answer?: string | null
          calculation_required?: string | null
          calculator_allowed?: boolean | null
          checked?: boolean | null
          code?: number | null
          corrected?: boolean | null
          difficulty?: string | null
          problem_image?: string | null
          problem_number?: string | null
          problem_text?: string | null
          question_id: string
          rec_time?: string | null
          skills?: string | null
          skills_for_step_1?: string | null
          skills_for_step_10?: string | null
          skills_for_step_11?: string | null
          skills_for_step_12?: string | null
          skills_for_step_13?: string | null
          skills_for_step_14?: string | null
          skills_for_step_15?: string | null
          skills_for_step_2?: string | null
          skills_for_step_3?: string | null
          skills_for_step_4?: string | null
          skills_for_step_5?: string | null
          skills_for_step_6?: string | null
          skills_for_step_7?: string | null
          skills_for_step_8?: string | null
          skills_for_step_9?: string | null
          solution_image?: string | null
          solution_text?: string | null
          solutiontextexpanded?: string | null
          source?: string | null
          step1_expanded_text?: string | null
          step1_text?: string | null
          step10_expanded_text?: string | null
          step10_text?: string | null
          step11_expanded_text?: string | null
          step11_text?: string | null
          step12_expanded_text?: string | null
          step12_text?: string | null
          step13_expanded_text?: string | null
          step13_text?: string | null
          step14_expanded_text?: string | null
          step14_text?: string | null
          step15_expanded_text?: string | null
          step15_text?: string | null
          step2_expanded_text?: string | null
          step2_text?: string | null
          step3_expanded_text?: string | null
          step3_text?: string | null
          step4_expanded_text?: string | null
          step4_text?: string | null
          step5_expanded_text?: string | null
          step5_text?: string | null
          step6_expanded_text?: string | null
          step6_text?: string | null
          step7_expanded_text?: string | null
          step7_text?: string | null
          step8_expanded_text?: string | null
          step8_text?: string | null
          step9_expanded_text?: string | null
          step9_text?: string | null
          steps_number?: number | null
          type?: string | null
        }
        Update: {
          answer?: string | null
          calculation_required?: string | null
          calculator_allowed?: boolean | null
          checked?: boolean | null
          code?: number | null
          corrected?: boolean | null
          difficulty?: string | null
          problem_image?: string | null
          problem_number?: string | null
          problem_text?: string | null
          question_id?: string
          rec_time?: string | null
          skills?: string | null
          skills_for_step_1?: string | null
          skills_for_step_10?: string | null
          skills_for_step_11?: string | null
          skills_for_step_12?: string | null
          skills_for_step_13?: string | null
          skills_for_step_14?: string | null
          skills_for_step_15?: string | null
          skills_for_step_2?: string | null
          skills_for_step_3?: string | null
          skills_for_step_4?: string | null
          skills_for_step_5?: string | null
          skills_for_step_6?: string | null
          skills_for_step_7?: string | null
          skills_for_step_8?: string | null
          skills_for_step_9?: string | null
          solution_image?: string | null
          solution_text?: string | null
          solutiontextexpanded?: string | null
          source?: string | null
          step1_expanded_text?: string | null
          step1_text?: string | null
          step10_expanded_text?: string | null
          step10_text?: string | null
          step11_expanded_text?: string | null
          step11_text?: string | null
          step12_expanded_text?: string | null
          step12_text?: string | null
          step13_expanded_text?: string | null
          step13_text?: string | null
          step14_expanded_text?: string | null
          step14_text?: string | null
          step15_expanded_text?: string | null
          step15_text?: string | null
          step2_expanded_text?: string | null
          step2_text?: string | null
          step3_expanded_text?: string | null
          step3_text?: string | null
          step4_expanded_text?: string | null
          step4_text?: string | null
          step5_expanded_text?: string | null
          step5_text?: string | null
          step6_expanded_text?: string | null
          step6_text?: string | null
          step7_expanded_text?: string | null
          step7_text?: string | null
          step8_expanded_text?: string | null
          step8_text?: string | null
          step9_expanded_text?: string | null
          step9_text?: string | null
          steps_number?: number | null
          type?: string | null
        }
        Relationships: []
      }
      ogemath_fipi_bank: {
        Row: {
          problem_image: string | null
          problem_link: string
          problem_number_type: number | null
          problem_text: string | null
          solution_text: string | null
          solutiontextexpanded: string | null
        }
        Insert: {
          problem_image?: string | null
          problem_link: string
          problem_number_type?: number | null
          problem_text?: string | null
          solution_text?: string | null
          solutiontextexpanded?: string | null
        }
        Update: {
          problem_image?: string | null
          problem_link?: string
          problem_number_type?: number | null
          problem_text?: string | null
          solution_text?: string | null
          solutiontextexpanded?: string | null
        }
        Relationships: []
      }
      problems_oge_100: {
        Row: {
          answer: string | null
          calculation_required: string | null
          calculator_allowed: boolean | null
          checked: boolean | null
          code: string | null
          corrected: boolean | null
          difficulty: string | null
          problem_image: string | null
          problem_number: number | null
          problem_text: string | null
          question_id: string
          rec_time: string | null
          skills: string | null
          skills_for_step_1: string | null
          skills_for_step_10: string | null
          skills_for_step_11: string | null
          skills_for_step_12: string | null
          skills_for_step_13: string | null
          skills_for_step_14: string | null
          skills_for_step_15: string | null
          skills_for_step_2: string | null
          skills_for_step_3: string | null
          skills_for_step_4: string | null
          skills_for_step_5: string | null
          skills_for_step_6: string | null
          skills_for_step_7: string | null
          skills_for_step_8: string | null
          skills_for_step_9: string | null
          solution_text: string | null
          solutiontextexpanded: string | null
          source: string | null
          step1_expanded_text: string | null
          step1_text: string | null
          step10_expanded_text: string | null
          step10_text: string | null
          step11_expanded_text: string | null
          step11_text: string | null
          step12_expanded_text: string | null
          step12_text: string | null
          step13_expanded_text: string | null
          step13_text: string | null
          step14_expanded_text: string | null
          step14_text: string | null
          step15_expanded_text: string | null
          step15_text: string | null
          step2_expanded_text: string | null
          step2_text: string | null
          step3_expanded_text: string | null
          step3_text: string | null
          step4_expanded_text: string | null
          step4_text: string | null
          step5_expanded_text: string | null
          step5_text: string | null
          step6_expanded_text: string | null
          step6_text: string | null
          step7_expanded_text: string | null
          step7_text: string | null
          step8_expanded_text: string | null
          step8_text: string | null
          step9_expanded_text: string | null
          step9_text: string | null
          steps_number: number | null
          type: string | null
        }
        Insert: {
          answer?: string | null
          calculation_required?: string | null
          calculator_allowed?: boolean | null
          checked?: boolean | null
          code?: string | null
          corrected?: boolean | null
          difficulty?: string | null
          problem_image?: string | null
          problem_number?: number | null
          problem_text?: string | null
          question_id: string
          rec_time?: string | null
          skills?: string | null
          skills_for_step_1?: string | null
          skills_for_step_10?: string | null
          skills_for_step_11?: string | null
          skills_for_step_12?: string | null
          skills_for_step_13?: string | null
          skills_for_step_14?: string | null
          skills_for_step_15?: string | null
          skills_for_step_2?: string | null
          skills_for_step_3?: string | null
          skills_for_step_4?: string | null
          skills_for_step_5?: string | null
          skills_for_step_6?: string | null
          skills_for_step_7?: string | null
          skills_for_step_8?: string | null
          skills_for_step_9?: string | null
          solution_text?: string | null
          solutiontextexpanded?: string | null
          source?: string | null
          step1_expanded_text?: string | null
          step1_text?: string | null
          step10_expanded_text?: string | null
          step10_text?: string | null
          step11_expanded_text?: string | null
          step11_text?: string | null
          step12_expanded_text?: string | null
          step12_text?: string | null
          step13_expanded_text?: string | null
          step13_text?: string | null
          step14_expanded_text?: string | null
          step14_text?: string | null
          step15_expanded_text?: string | null
          step15_text?: string | null
          step2_expanded_text?: string | null
          step2_text?: string | null
          step3_expanded_text?: string | null
          step3_text?: string | null
          step4_expanded_text?: string | null
          step4_text?: string | null
          step5_expanded_text?: string | null
          step5_text?: string | null
          step6_expanded_text?: string | null
          step6_text?: string | null
          step7_expanded_text?: string | null
          step7_text?: string | null
          step8_expanded_text?: string | null
          step8_text?: string | null
          step9_expanded_text?: string | null
          step9_text?: string | null
          steps_number?: number | null
          type?: string | null
        }
        Update: {
          answer?: string | null
          calculation_required?: string | null
          calculator_allowed?: boolean | null
          checked?: boolean | null
          code?: string | null
          corrected?: boolean | null
          difficulty?: string | null
          problem_image?: string | null
          problem_number?: number | null
          problem_text?: string | null
          question_id?: string
          rec_time?: string | null
          skills?: string | null
          skills_for_step_1?: string | null
          skills_for_step_10?: string | null
          skills_for_step_11?: string | null
          skills_for_step_12?: string | null
          skills_for_step_13?: string | null
          skills_for_step_14?: string | null
          skills_for_step_15?: string | null
          skills_for_step_2?: string | null
          skills_for_step_3?: string | null
          skills_for_step_4?: string | null
          skills_for_step_5?: string | null
          skills_for_step_6?: string | null
          skills_for_step_7?: string | null
          skills_for_step_8?: string | null
          skills_for_step_9?: string | null
          solution_text?: string | null
          solutiontextexpanded?: string | null
          source?: string | null
          step1_expanded_text?: string | null
          step1_text?: string | null
          step10_expanded_text?: string | null
          step10_text?: string | null
          step11_expanded_text?: string | null
          step11_text?: string | null
          step12_expanded_text?: string | null
          step12_text?: string | null
          step13_expanded_text?: string | null
          step13_text?: string | null
          step14_expanded_text?: string | null
          step14_text?: string | null
          step15_expanded_text?: string | null
          step15_text?: string | null
          step2_expanded_text?: string | null
          step2_text?: string | null
          step3_expanded_text?: string | null
          step3_text?: string | null
          step4_expanded_text?: string | null
          step4_text?: string | null
          step5_expanded_text?: string | null
          step5_text?: string | null
          step6_expanded_text?: string | null
          step6_text?: string | null
          step7_expanded_text?: string | null
          step7_text?: string | null
          step8_expanded_text?: string | null
          step8_text?: string | null
          step9_expanded_text?: string | null
          step9_text?: string | null
          steps_number?: number | null
          type?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
