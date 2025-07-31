import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
  Modal,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface UserProfile {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar: string;
  userType: 'simple' | 'supplier';
  country: string;
  city: string;
  address: string;
  bio?: string;
  verified: boolean;
}

const ProfileScreen = ({navigation}: any) => {
  const [profile, setProfile] = useState<UserProfile>({
    id: '1',
    username: 'jean_trader',
    firstName: 'Jean',
    lastName: 'Mukendi',
    email: 'jean.mukendi@email.com',
    phone: '+243971234567',
    avatar: 'https://via.placeholder.com/150x150/1a1a2e/00FFFF?text=JM',
    userType: 'supplier',
    country: 'République Démocratique du Congo',
    city: 'Kinshasa',
    address: 'Avenue de la Paix, Gombe',
    bio: 'Vendeur passionné de produits tech depuis 5 ans.',
    verified: true,
  });

  const [editing, setEditing] = useState(false);
  const [showImagePicker, setShowImagePicker] = useState(false);

  const handleSave = async () => {
    try {
      // TODO: Implement profile update with Supabase
      Alert.alert('Succès', 'Profil mis à jour avec succès');
      setEditing(false);
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de mettre à jour le profil');
    }
  };

  const handleImageSelect = () => {
    // TODO: Implement image picker
    setShowImagePicker(false);
    Alert.alert('Info', 'Sélection d\'image en cours de développement');
  };

  const ProfileField = ({
    label,
    value,
    onChangeText,
    editable = true,
    multiline = false,
    keyboardType = 'default' as any,
  }: {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    editable?: boolean;
    multiline?: boolean;
    keyboardType?: any;
  }) => (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        style={[
          styles.fieldInput,
          multiline && styles.multilineInput,
          !editable && styles.disabledInput,
        ]}
        value={value}
        onChangeText={onChangeText}
        editable={editing && editable}
        multiline={multiline}
        numberOfLines={multiline ? 3 : 1}
        keyboardType={keyboardType}
        placeholderTextColor="#666"
      />
    </View>
  );

  return (
    <LinearGradient colors={['#0a0a0a', '#1a1a2e', '#16213e']} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Mon Profil</Text>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setEditing(!editing)}>
            <Text style={styles.editIcon}>{editing ? '✓' : '✏️'}</Text>
          </TouchableOpacity>
        </View>

        {/* Avatar Section */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarContainer}>
            <Image source={{uri: profile.avatar}} style={styles.avatar} />
            {profile.verified && <Text style={styles.verifiedBadge}>✓</Text>}
            {editing && (
              <TouchableOpacity
                style={styles.changeAvatarButton}
                onPress={() => setShowImagePicker(true)}>
                <Text style={styles.changeAvatarIcon}>📷</Text>
              </TouchableOpacity>
            )}
          </View>
          <Text style={styles.userTypeIndicator}>
            {profile.userType === 'supplier' ? '🏪 Fournisseur' : '👤 Utilisateur'}
          </Text>
        </View>

        {/* Form */}
        <View style={styles.formContainer}>
          <LinearGradient
            colors={['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)']}
            style={styles.formGradient}>
            
            {/* Informations personnelles */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Informations personnelles</Text>
              
              <ProfileField
                label="Prénom"
                value={profile.firstName}
                onChangeText={(text) => setProfile({...profile, firstName: text})}
              />
              
              <ProfileField
                label="Nom"
                value={profile.lastName}
                onChangeText={(text) => setProfile({...profile, lastName: text})}
              />
              
              <ProfileField
                label="Nom d'utilisateur"
                value={profile.username}
                onChangeText={(text) => setProfile({...profile, username: text})}
              />
              
              <ProfileField
                label="Email"
                value={profile.email}
                onChangeText={(text) => setProfile({...profile, email: text})}
                keyboardType="email-address"
              />
              
              <ProfileField
                label="Téléphone"
                value={profile.phone}
                onChangeText={(text) => setProfile({...profile, phone: text})}
                keyboardType="phone-pad"
              />
            </View>

            {/* Localisation */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Localisation</Text>
              
              <ProfileField
                label="Pays"
                value={profile.country}
                onChangeText={(text) => setProfile({...profile, country: text})}
              />
              
              <ProfileField
                label="Ville"
                value={profile.city}
                onChangeText={(text) => setProfile({...profile, city: text})}
              />
              
              <ProfileField
                label="Adresse"
                value={profile.address}
                onChangeText={(text) => setProfile({...profile, address: text})}
                multiline
              />
            </View>

            {/* Bio (pour fournisseurs) */}
            {profile.userType === 'supplier' && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Description professionnelle</Text>
                
                <ProfileField
                  label="Bio / Description de votre entreprise"
                  value={profile.bio || ''}
                  onChangeText={(text) => setProfile({...profile, bio: text})}
                  multiline
                />
              </View>
            )}

            {/* Boutons d'action */}
            {editing && (
              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setEditing(false)}>
                  <Text style={styles.cancelButtonText}>Annuler</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                  <LinearGradient
                    colors={['#00FFFF', '#0080FF']}
                    style={styles.saveButtonGradient}>
                    <Text style={styles.saveButtonText}>Sauvegarder</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            )}
          </LinearGradient>
        </View>

        {/* Statistiques */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Statistiques</Text>
          <LinearGradient
            colors={['rgba(0,255,255,0.1)', 'rgba(0,128,255,0.1)']}
            style={styles.statsGradient}>
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>89</Text>
                <Text style={styles.statLabel}>
                  {profile.userType === 'supplier' ? 'Ventes' : 'Achats'}
                </Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>156</Text>
                <Text style={styles.statLabel}>Avis</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>⭐ 4.8</Text>
                <Text style={styles.statLabel}>Note</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>5</Text>
                <Text style={styles.statLabel}>Années</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Actions avancées */}
        <View style={styles.advancedSection}>
          <Text style={styles.sectionTitle}>Actions</Text>
          
          <TouchableOpacity style={styles.actionItem}>
            <LinearGradient
              colors={['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)']}
              style={styles.actionItemGradient}>
              <Text style={styles.actionIcon}>🔒</Text>
              <Text style={styles.actionText}>Changer le mot de passe</Text>
              <Text style={styles.actionArrow}>›</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem}>
            <LinearGradient
              colors={['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)']}
              style={styles.actionItemGradient}>
              <Text style={styles.actionIcon}>🗑️</Text>
              <Text style={styles.actionText}>Supprimer le compte</Text>
              <Text style={styles.actionArrow}>›</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Modal de sélection d'image */}
      <Modal
        visible={showImagePicker}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowImagePicker(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Changer la photo de profil</Text>
            
            <TouchableOpacity
              style={styles.modalOption}
              onPress={handleImageSelect}>
              <Text style={styles.modalOptionText}>📷 Prendre une photo</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.modalOption}
              onPress={handleImageSelect}>
              <Text style={styles.modalOptionText}>🖼️ Choisir dans la galerie</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.modalCancel}
              onPress={() => setShowImagePicker(false)}>
              <Text style={styles.modalCancelText}>Annuler</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 50,
  },
  backButton: {
    padding: 5,
  },
  backIcon: {
    color: '#00FFFF',
    fontSize: 24,
  },
  headerTitle: {
    color: '#00FFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  editButton: {
    padding: 5,
  },
  editIcon: {
    fontSize: 20,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 10,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#00FFFF',
  },
  verifiedBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#00FFFF',
    color: '#000',
    borderRadius: 15,
    width: 30,
    height: 30,
    textAlign: 'center',
    lineHeight: 30,
    fontSize: 18,
    fontWeight: 'bold',
  },
  changeAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#00FFFF',
  },
  changeAvatarIcon: {
    fontSize: 16,
  },
  userTypeIndicator: {
    color: '#ccc',
    fontSize: 16,
  },
  formContainer: {
    margin: 20,
    borderRadius: 20,
    overflow: 'hidden',
  },
  formGradient: {
    padding: 20,
    borderWidth: 1,
    borderColor: '#333',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    color: '#00FFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  fieldContainer: {
    marginBottom: 15,
  },
  fieldLabel: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 5,
  },
  fieldInput: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 10,
    padding: 12,
    color: '#fff',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  multilineInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  disabledInput: {
    opacity: 0.7,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 15,
    marginTop: 20,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#666',
  },
  cancelButtonText: {
    color: '#ccc',
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveButton: {
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden',
  },
  saveButtonGradient: {
    padding: 15,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  statsSection: {
    margin: 20,
  },
  statsGradient: {
    borderRadius: 15,
    padding: 20,
    borderWidth: 1,
    borderColor: '#333',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    color: '#00FFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#ccc',
    fontSize: 12,
    marginTop: 5,
  },
  advancedSection: {
    margin: 20,
    marginBottom: 50,
  },
  actionItem: {
    marginBottom: 10,
    borderRadius: 12,
    overflow: 'hidden',
  },
  actionItemGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    borderColor: '#333',
  },
  actionIcon: {
    fontSize: 20,
    marginRight: 15,
    width: 25,
    textAlign: 'center',
  },
  actionText: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
  },
  actionArrow: {
    color: '#666',
    fontSize: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#1a1a2e',
    borderRadius: 20,
    padding: 30,
    width: '80%',
    borderWidth: 1,
    borderColor: '#333',
  },
  modalTitle: {
    color: '#00FFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalOption: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#333',
  },
  modalOptionText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  modalCancel: {
    backgroundColor: 'rgba(255,0,0,0.1)',
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ff4444',
  },
  modalCancelText: {
    color: '#ff4444',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default ProfileScreen;