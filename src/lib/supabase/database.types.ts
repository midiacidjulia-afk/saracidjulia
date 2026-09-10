export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      churches: {
        Row: {
          id: string;
          name: string;
          city: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          city: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          city?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      participants: {
        Row: {
          id: string;
          name: string;
          whatsapp: string;
          city: string;
          church_id: string;
          hide_from_ranking: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          whatsapp: string;
          city: string;
          church_id: string;
          hide_from_ranking?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          whatsapp?: string;
          city?: string;
          church_id?: string;
          hide_from_ranking?: boolean;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "participants_church_id_fkey";
            columns: ["church_id"];
            isOneToOne: false;
            referencedRelation: "churches";
            referencedColumns: ["id"];
          },
        ];
      };
      contributions: {
        Row: {
          id: string;
          participant_id: string;
          church_id: string;
          cotas: number;
          amount: number;
          contribution_date: string;
          status: "pendente" | "aprovado" | "reprovado";
          created_at: string;
        };
        Insert: {
          id?: string;
          participant_id: string;
          church_id: string;
          cotas: number;
          amount: number;
          contribution_date: string;
          status?: "pendente" | "aprovado" | "reprovado";
          created_at?: string;
        };
        Update: {
          id?: string;
          participant_id?: string;
          church_id?: string;
          cotas?: number;
          amount?: number;
          contribution_date?: string;
          status?: "pendente" | "aprovado" | "reprovado";
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "contributions_participant_id_fkey";
            columns: ["participant_id"];
            isOneToOne: false;
            referencedRelation: "participants";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "contributions_church_id_fkey";
            columns: ["church_id"];
            isOneToOne: false;
            referencedRelation: "churches";
            referencedColumns: ["id"];
          },
        ];
      };
      receipts: {
        Row: {
          id: string;
          contribution_id: string;
          file_url: string;
          status: "pendente" | "aprovado" | "reprovado";
          reviewed_by: string | null;
          reviewed_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          contribution_id: string;
          file_url: string;
          status?: "pendente" | "aprovado" | "reprovado";
          reviewed_by?: string | null;
          reviewed_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          contribution_id?: string;
          file_url?: string;
          status?: "pendente" | "aprovado" | "reprovado";
          reviewed_by?: string | null;
          reviewed_at?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "receipts_contribution_id_fkey";
            columns: ["contribution_id"];
            isOneToOne: false;
            referencedRelation: "contributions";
            referencedColumns: ["id"];
          },
        ];
      };
      settings: {
        Row: {
          id: number;
          goal_amount: number;
          cota_value: number;
          total_cotas: number;
          whatsapp_number: string;
          whatsapp_contact_name: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          goal_amount?: number;
          cota_value?: number;
          total_cotas?: number;
          whatsapp_number?: string;
          whatsapp_contact_name?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          goal_amount?: number;
          cota_value?: number;
          total_cotas?: number;
          whatsapp_number?: string;
          whatsapp_contact_name?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      impact_stats: {
        Row: {
          id: number;
          people_reached: number;
          lives_transformed: number;
          families_supported: number;
          new_people: number;
          projects_completed: number;
          updated_at: string;
        };
        Insert: {
          id?: number;
          people_reached?: number;
          lives_transformed?: number;
          families_supported?: number;
          new_people?: number;
          projects_completed?: number;
          updated_at?: string;
        };
        Update: {
          id?: number;
          people_reached?: number;
          lives_transformed?: number;
          families_supported?: number;
          new_people?: number;
          projects_completed?: number;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      receipt_status: "pendente" | "aprovado" | "reprovado";
    };
    CompositeTypes: Record<string, never>;
  };
};
