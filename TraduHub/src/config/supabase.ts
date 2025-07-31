import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

const supabaseUrl = 'https://mgsbxvttetlpcrvdfsed.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1nc2J4dnR0ZXRscGNydmRmc2VkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk3NjQwODIsImV4cCI6MjA2NTM0MDA4Mn0.TN8BlSXWlMnLKhXrpjyal1ncT7Lr_lnVgv5tpwmXEwQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false,
  },
});

// Types pour la base de données
export interface User {
  id: string;
  email: string;
  phone: string;
  username: string;
  first_name: string;
  last_name: string;
  user_type: 'simple' | 'supplier';
  country: string;
  city: string;
  address: string;
  bio?: string;
  avatar_url?: string;
  verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  supplier_id: string;
  name: string;
  description: string;
  price: number;
  original_price?: number;
  currency: string;
  category: string;
  images: string[];
  quantity: number;
  is_active: boolean;
  is_featured: boolean;
  tags: string[];
  specifications?: any;
  created_at: string;
  updated_at: string;
}

export interface Supplier {
  id: string;
  user_id: string;
  business_name: string;
  business_type: string;
  payment_verified: boolean;
  payment_date?: string;
  rating: number;
  total_sales: number;
  total_reviews: number;
  response_time_hours: number;
  specialties: string[];
  badges: string[];
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  buyer_id: string;
  supplier_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  delivery_address: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  message_type: 'text' | 'image' | 'product';
  metadata?: any;
  is_read: boolean;
  created_at: string;
}

export interface Conversation {
  id: string;
  buyer_id: string;
  supplier_id: string;
  product_id?: string;
  last_message_id?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: string;
  reviewer_id: string;
  reviewed_id: string; // supplier_id or product_id
  review_type: 'supplier' | 'product';
  rating: number;
  comment?: string;
  order_id?: string;
  created_at: string;
}

// Fonctions d'authentification
export const authService = {
  // Inscription utilisateur simple
  async signUpUser(userData: {
    email: string;
    password: string;
    phone: string;
    username: string;
    firstName: string;
    lastName: string;
    country: string;
    city: string;
    address: string;
  }) {
    try {
      // Créer le compte auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
      });

      if (authError) throw authError;

      // Créer le profil utilisateur
      if (authData.user) {
        const { error: profileError } = await supabase
          .from('users')
          .insert({
            id: authData.user.id,
            email: userData.email,
            phone: userData.phone,
            username: userData.username,
            first_name: userData.firstName,
            last_name: userData.lastName,
            user_type: 'simple',
            country: userData.country,
            city: userData.city,
            address: userData.address,
            verified: false,
          });

        if (profileError) throw profileError;
      }

      return { data: authData, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Inscription fournisseur
  async signUpSupplier(userData: {
    email: string;
    password: string;
    phone: string;
    username: string;
    firstName: string;
    lastName: string;
    country: string;
    city: string;
    address: string;
    bio?: string;
    businessName: string;
  }) {
    try {
      // Créer le compte auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
      });

      if (authError) throw authError;

      // Créer le profil utilisateur
      if (authData.user) {
        const { error: profileError } = await supabase
          .from('users')
          .insert({
            id: authData.user.id,
            email: userData.email,
            phone: userData.phone,
            username: userData.username,
            first_name: userData.firstName,
            last_name: userData.lastName,
            user_type: 'supplier',
            country: userData.country,
            city: userData.city,
            address: userData.address,
            bio: userData.bio,
            verified: false,
          });

        if (profileError) throw profileError;

        // Créer le profil fournisseur
        const { error: supplierError } = await supabase
          .from('suppliers')
          .insert({
            id: authData.user.id,
            user_id: authData.user.id,
            business_name: userData.businessName,
            business_type: 'individual',
            payment_verified: false,
            rating: 0,
            total_sales: 0,
            total_reviews: 0,
            response_time_hours: 24,
            specialties: [],
            badges: ['Nouveau'],
          });

        if (supplierError) throw supplierError;
      }

      return { data: authData, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Connexion
  async signIn(credential: string, password: string) {
    try {
      // Déterminer si c'est un email ou username/phone
      const isEmail = credential.includes('@');
      
      if (isEmail) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: credential,
          password,
        });
        return { data, error };
      } else {
        // Rechercher l'email par username ou phone
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('email')
          .or(`username.eq.${credential},phone.eq.${credential}`)
          .single();

        if (userError || !userData) {
          return { data: null, error: new Error('Utilisateur non trouvé') };
        }

        const { data, error } = await supabase.auth.signInWithPassword({
          email: userData.email,
          password,
        });
        return { data, error };
      }
    } catch (error) {
      return { data: null, error };
    }
  },

  // Déconnexion
  async signOut() {
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  // Obtenir la session actuelle
  async getSession() {
    const { data: { session }, error } = await supabase.auth.getSession();
    return { session, error };
  },

  // Obtenir le profil utilisateur
  async getUserProfile(userId: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();
    
    return { data, error };
  },
};

// Fonctions pour les produits
export const productService = {
  // Obtenir tous les produits avec filtres
  async getProducts(filters?: {
    category?: string;
    location?: string;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    supplierId?: string;
  }) {
    let query = supabase
      .from('products')
      .select(`
        *,
        supplier:suppliers(
          business_name,
          rating,
          user:users(city, country)
        )
      `)
      .eq('is_active', true);

    if (filters?.category && filters.category !== 'Toutes') {
      query = query.eq('category', filters.category);
    }

    if (filters?.search) {
      query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
    }

    if (filters?.minPrice) {
      query = query.gte('price', filters.minPrice);
    }

    if (filters?.maxPrice) {
      query = query.lte('price', filters.maxPrice);
    }

    if (filters?.supplierId) {
      query = query.eq('supplier_id', filters.supplierId);
    }

    const { data, error } = await query.order('created_at', { ascending: false });
    return { data, error };
  },

  // Créer un produit
  async createProduct(productData: Omit<Product, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('products')
      .insert(productData)
      .select()
      .single();
    
    return { data, error };
  },

  // Mettre à jour un produit
  async updateProduct(productId: string, updates: Partial<Product>) {
    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', productId)
      .select()
      .single();
    
    return { data, error };
  },
};

// Fonctions pour les fournisseurs
export const supplierService = {
  // Obtenir tous les fournisseurs avec filtres
  async getSuppliers(filters?: {
    category?: string;
    location?: string;
    search?: string;
    onlineOnly?: boolean;
    verifiedOnly?: boolean;
  }) {
    let query = supabase
      .from('suppliers')
      .select(`
        *,
        user:users(
          first_name,
          last_name,
          username,
          city,
          country,
          avatar_url,
          verified
        )
      `);

    if (filters?.search) {
      query = query.or(`business_name.ilike.%${filters.search}%`);
    }

    if (filters?.verifiedOnly) {
      query = query.eq('payment_verified', true);
    }

    const { data, error } = await query.order('rating', { ascending: false });
    return { data, error };
  },

  // Vérifier le paiement d'un fournisseur
  async verifySupplierPayment(supplierId: string) {
    const { data, error } = await supabase
      .from('suppliers')
      .update({
        payment_verified: true,
        payment_date: new Date().toISOString(),
      })
      .eq('id', supplierId)
      .select()
      .single();
    
    return { data, error };
  },
};

// Fonctions pour les messages
export const messageService = {
  // Créer une conversation
  async createConversation(buyerId: string, supplierId: string, productId?: string) {
    const { data, error } = await supabase
      .from('conversations')
      .insert({
        buyer_id: buyerId,
        supplier_id: supplierId,
        product_id: productId,
        is_active: true,
      })
      .select()
      .single();
    
    return { data, error };
  },

  // Envoyer un message
  async sendMessage(conversationId: string, senderId: string, content: string) {
    const { data, error } = await supabase
      .from('messages')
      .insert({
        conversation_id: conversationId,
        sender_id: senderId,
        content,
        message_type: 'text',
        is_read: false,
      })
      .select()
      .single();
    
    return { data, error };
  },

  // Obtenir les conversations d'un utilisateur
  async getUserConversations(userId: string) {
    const { data, error } = await supabase
      .from('conversations')
      .select(`
        *,
        buyer:users!buyer_id(first_name, last_name, avatar_url),
        supplier:users!supplier_id(first_name, last_name, avatar_url),
        product:products(name, images),
        last_message:messages(content, created_at, sender_id)
      `)
      .or(`buyer_id.eq.${userId},supplier_id.eq.${userId}`)
      .eq('is_active', true)
      .order('updated_at', { ascending: false });
    
    return { data, error };
  },
};