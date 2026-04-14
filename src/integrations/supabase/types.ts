export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      admin_users: {
        Row: {
          created_at: string
          id: string
          role: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "admin_users_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      availabilities: {
        Row: {
          created_at: string
          day_of_week: string
          hour: string
          id: string
          profile_id: string | null
        }
        Insert: {
          created_at?: string
          day_of_week: string
          hour: string
          id?: string
          profile_id?: string | null
        }
        Update: {
          created_at?: string
          day_of_week?: string
          hour?: string
          id?: string
          profile_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "availabilities_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      cached_coordinates: {
        Row: {
          address: string
          created_at: string
          id: string
          latitude: number
          longitude: number
        }
        Insert: {
          address: string
          created_at?: string
          id?: string
          latitude: number
          longitude: number
        }
        Update: {
          address?: string
          created_at?: string
          id?: string
          latitude?: number
          longitude?: number
        }
        Relationships: []
      }
      partner_ads: {
        Row: {
          click_count: number
          created_at: string
          description: string | null
          destination_url: string | null
          id: string
          image_url: string | null
          is_active: boolean | null
          partner_id: string | null
          title: string
          updated_at: string
          view_count: number
        }
        Insert: {
          click_count?: number
          created_at?: string
          description?: string | null
          destination_url?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          partner_id?: string | null
          title: string
          updated_at?: string
          view_count?: number
        }
        Update: {
          click_count?: number
          created_at?: string
          description?: string | null
          destination_url?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          partner_id?: string | null
          title?: string
          updated_at?: string
          view_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "partner_ads_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
        ]
      }
      partners: {
        Row: {
          company_name: string | null
          contact_person: string | null
          created_at: string
          email: string | null
          id: string
          phone_number: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          company_name?: string | null
          contact_person?: string | null
          created_at?: string
          email?: string | null
          id?: string
          phone_number?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          company_name?: string | null
          contact_person?: string | null
          created_at?: string
          email?: string | null
          id?: string
          phone_number?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      profile_pictures: {
        Row: {
          created_at: string
          display_order: number | null
          id: string
          is_main_picture: boolean | null
          picture_url: string
          profile_id: string | null
        }
        Insert: {
          created_at?: string
          display_order?: number | null
          id?: string
          is_main_picture?: boolean | null
          picture_url: string
          profile_id?: string | null
        }
        Update: {
          created_at?: string
          display_order?: number | null
          id?: string
          is_main_picture?: boolean | null
          picture_url?: string
          profile_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profile_pictures_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profile_searches: {
        Row: {
          breast_sizes: string[] | null
          created_at: string
          hair_colours: string[] | null
          id: string
          latitude: number
          location: string
          longitude: number
          max_age: number | null
          max_distance: number
          min_age: number | null
        }
        Insert: {
          breast_sizes?: string[] | null
          created_at?: string
          hair_colours?: string[] | null
          id?: string
          latitude: number
          location: string
          longitude: number
          max_age?: number | null
          max_distance: number
          min_age?: number | null
        }
        Update: {
          breast_sizes?: string[] | null
          created_at?: string
          hair_colours?: string[] | null
          id?: string
          latitude?: number
          location?: string
          longitude?: number
          max_age?: number | null
          max_distance?: number
          min_age?: number | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          about_me: string | null
          age: number | null
          availability_status: string | null
          body_type: string | null
          breast_size: string | null
          created_at: string
          distance_km: number | null
          drive_minutes: number | null
          favorite_flower: string | null
          full_name: string | null
          gender: string
          hair_colour: string | null
          id: string
          is_available: boolean | null
          is_featured: boolean | null
          latest_payment: string | null
          latitude: number | null
          location: string | null
          longitude: number | null
          phone_number: string | null
          profile_picture_url: string | null
          service_type: string
          skin_tone: string | null
          user_id: string | null
          username: string | null
        }
        Insert: {
          about_me?: string | null
          age?: number | null
          availability_status?: string | null
          body_type?: string | null
          breast_size?: string | null
          created_at?: string
          distance_km?: number | null
          drive_minutes?: number | null
          favorite_flower?: string | null
          full_name?: string | null
          gender: string
          hair_colour?: string | null
          id?: string
          is_available?: boolean | null
          is_featured?: boolean | null
          latest_payment?: string | null
          latitude?: number | null
          location?: string | null
          longitude?: number | null
          phone_number?: string | null
          profile_picture_url?: string | null
          service_type: string
          skin_tone?: string | null
          user_id?: string | null
          username?: string | null
        }
        Update: {
          about_me?: string | null
          age?: number | null
          availability_status?: string | null
          body_type?: string | null
          breast_size?: string | null
          created_at?: string
          distance_km?: number | null
          drive_minutes?: number | null
          favorite_flower?: string | null
          full_name?: string | null
          gender?: string
          hair_colour?: string | null
          id?: string
          is_available?: boolean | null
          is_featured?: boolean | null
          latest_payment?: string | null
          latitude?: number | null
          location?: string | null
          longitude?: number | null
          phone_number?: string | null
          profile_picture_url?: string | null
          service_type?: string
          skin_tone?: string | null
          user_id?: string | null
          username?: string | null
        }
        Relationships: []
      }
      reviews: {
        Row: {
          created_at: string
          date: string
          id: string
          location: string | null
          profile_id: string
          rating: number
          reviewer_name: string
          text: string
        }
        Insert: {
          created_at?: string
          date?: string
          id?: string
          location?: string | null
          profile_id: string
          rating: number
          reviewer_name: string
          text: string
        }
        Update: {
          created_at?: string
          date?: string
          id?: string
          location?: string | null
          profile_id?: string
          rating?: number
          reviewer_name?: string
          text?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      secrets: {
        Row: {
          created_at: string | null
          id: string
          name: string
          updated_at: string | null
          value: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          updated_at?: string | null
          value: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          updated_at?: string | null
          value?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      cube:
        | {
            Args: {
              "": number[]
            }
            Returns: unknown
          }
        | {
            Args: {
              "": number
            }
            Returns: unknown
          }
      cube_dim: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      cube_in: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      cube_is_point: {
        Args: {
          "": unknown
        }
        Returns: boolean
      }
      cube_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      cube_recv: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      cube_send: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      cube_size: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      earth: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      gc_to_sec: {
        Args: {
          "": number
        }
        Returns: number
      }
      get_featured_profiles: {
        Args: {
          search_service_type?: string
          search_gender?: string
          limit_count?: number
        }
        Returns: {
          id: string
          full_name: string
          age: number
          location: string
          availability_status: string
          profile_picture_url: string
          latest_payment: string
          is_featured: boolean
          service_type: string
          gender: string
        }[]
      }
      latitude: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      longitude: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      search_nearby_profiles:
        | {
            Args: {
              search_lat: number
              search_lon: number
              max_distance_km: number
            }
            Returns: {
              id: string
              full_name: string
              age: number
              location: string
              availability_status: string
              profile_picture_url: string
              distance_km: number
              hair_colour: string
              breast_size: string
              latitude: number
              longitude: number
            }[]
          }
        | {
            Args: {
              search_lat: number
              search_lon: number
              max_distance_km: number
              search_service_type?: string
              search_gender?: string
              hair_colours?: string[]
              breast_sizes?: string[]
              skin_tones?: string[]
              body_types?: string[]
              min_age?: number
              max_age?: number
            }
            Returns: {
              id: string
              full_name: string
              age: number
              location: string
              availability_status: string
              profile_picture_url: string
              distance_km: number
              hair_colour: string
              breast_size: string
              skin_tone: string
              body_type: string
              gender: string
              service_type: string
              latitude: number
              longitude: number
            }[]
          }
      sec_to_gc: {
        Args: {
          "": number
        }
        Returns: number
      }
      update_drive_time: {
        Args: {
          profile_id: string
          drive_time: number
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
