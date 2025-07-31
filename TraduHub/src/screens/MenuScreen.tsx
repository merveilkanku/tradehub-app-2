import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Switch,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

// Mock data pour l'utilisateur connecté
const mockUser = {
  id: '1',
  username: 'jean_trader',
  firstName: 'Jean',
  lastName: 'Mukendi',
  email: 'jean.mukendi@email.com',
  phone: '+243971234567',
  avatar: 'https://via.placeholder.com/100x100/1a1a2e/00FFFF?text=JM',
  userType: 'supplier', // 'simple' ou 'supplier'
  country: 'République Démocratique du Congo',
  city: 'Kinshasa',
  address: 'Avenue de la Paix, Gombe',
  bio: 'Vendeur passionné de produits tech depuis 5 ans.',
  joinedDate: '2019-03-15',
  verified: true,
  stats: {
    purchases: 12,
    sales: 89,
    reviews: 156,
    rating: 4.8,
  },
};

const MenuScreen = () => {
  const [user, setUser] = useState(mockUser);
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState('Français');

  const handleLogout = () => {
    Alert.alert(
      'Déconnexion',
      'Êtes-vous sûr de vouloir vous déconnecter?',
      [
        {text: 'Annuler', style: 'cancel'},
        {text: 'Déconnecter', onPress: () => console.log('Logout'), style: 'destructive'},
      ]
    );
  };

  const handleEditProfile = () => {
    // TODO: Navigate to profile edit screen
    console.log('Edit profile');
  };

  const handleViewPurchases = () => {
    // TODO: Navigate to purchases screen
    console.log('View purchases');
  };

  const handleManageProducts = () => {
    // TODO: Navigate to product management screen
    console.log('Manage products');
  };

  const handleViewSales = () => {
    // TODO: Navigate to sales screen
    console.log('View sales');
  };

  const MenuSection = ({title, children}: {title: string; children: React.ReactNode}) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );

  const MenuItem = ({
    icon,
    title,
    subtitle,
    onPress,
    showArrow = true,
    rightComponent,
  }: {
    icon: string;
    title: string;
    subtitle?: string;
    onPress?: () => void;
    showArrow?: boolean;
    rightComponent?: React.ReactNode;
  }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <LinearGradient
        colors={['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)']}
        style={styles.menuItemGradient}>
        <Text style={styles.menuIcon}>{icon}</Text>
        <View style={styles.menuItemContent}>
          <Text style={styles.menuTitle}>{title}</Text>
          {subtitle && <Text style={styles.menuSubtitle}>{subtitle}</Text>}
        </View>
        {rightComponent || (showArrow && <Text style={styles.menuArrow}>›</Text>)}
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={['#0a0a0a', '#1a1a2e', '#16213e']} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Menu</Text>
        </View>

        {/* Profile Section */}
        <View style={styles.profileSection}>
          <LinearGradient
            colors={['rgba(0,255,255,0.1)', 'rgba(0,128,255,0.1)']}
            style={styles.profileGradient}>
            <View style={styles.profileHeader}>
              <View style={styles.avatarContainer}>
                <Image source={{uri: user.avatar}} style={styles.avatar} />
                {user.verified && <Text style={styles.verifiedBadge}>✓</Text>}
                <TouchableOpacity style={styles.editAvatarButton}>
                  <Text style={styles.editAvatarIcon}>📷</Text>
                </TouchableOpacity>
              </View>
              
              <View style={styles.profileInfo}>
                <Text style={styles.userName}>{user.firstName} {user.lastName}</Text>
                <Text style={styles.userHandle}>@{user.username}</Text>
                <Text style={styles.userType}>
                  {user.userType === 'supplier' ? '🏪 Fournisseur' : '👤 Utilisateur'}
                </Text>
                <Text style={styles.userLocation}>📍 {user.city}, {user.country}</Text>
              </View>
            </View>

            {user.bio && (
              <Text style={styles.userBio}>{user.bio}</Text>
            )}

            {/* Stats */}
            <View style={styles.statsContainer}>
              {user.userType === 'supplier' ? (
                <>
                  <View style={styles.statItem}>
                    <Text style={styles.statNumber}>{user.stats.sales}</Text>
                    <Text style={styles.statLabel}>Ventes</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statNumber}>{user.stats.reviews}</Text>
                    <Text style={styles.statLabel}>Avis</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statNumber}>⭐ {user.stats.rating}</Text>
                    <Text style={styles.statLabel}>Note</Text>
                  </View>
                </>
              ) : (
                <>
                  <View style={styles.statItem}>
                    <Text style={styles.statNumber}>{user.stats.purchases}</Text>
                    <Text style={styles.statLabel}>Achats</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statNumber}>{user.stats.reviews}</Text>
                    <Text style={styles.statLabel}>Avis donnés</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statNumber}>
                      {new Date().getFullYear() - new Date(user.joinedDate).getFullYear()}
                    </Text>
                    <Text style={styles.statLabel}>Années</Text>
                  </View>
                </>
              )}
            </View>

            <TouchableOpacity style={styles.editProfileButton} onPress={handleEditProfile}>
              <LinearGradient colors={['#00FFFF', '#0080FF']} style={styles.editProfileGradient}>
                <Text style={styles.editProfileText}>Modifier le profil</Text>
              </LinearGradient>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        {/* Menu Items */}
        <MenuSection title="Mon Compte">
          <MenuItem
            icon="👤"
            title="Informations personnelles"
            subtitle="Email, téléphone, adresse"
            onPress={handleEditProfile}
          />
          
          {user.userType === 'simple' ? (
            <MenuItem
              icon="🛍️"
              title="Mes achats"
              subtitle="Historique des commandes"
              onPress={handleViewPurchases}
            />
          ) : (
            <>
              <MenuItem
                icon="📦"
                title="Gérer mes produits"
                subtitle="Ajouter, modifier, supprimer"
                onPress={handleManageProducts}
              />
              <MenuItem
                icon="💰"
                title="Mes ventes"
                subtitle="Historique et statistiques"
                onPress={handleViewSales}
              />
              <MenuItem
                icon="📊"
                title="Tableau de bord"
                subtitle="Analytics et performances"
                onPress={() => console.log('Dashboard')}
              />
            </>
          )}
          
          <MenuItem
            icon="⭐"
            title="Mes évaluations"
            subtitle={user.userType === 'supplier' ? 'Avis clients' : 'Avis donnés'}
            onPress={() => console.log('Reviews')}
          />
        </MenuSection>

        <MenuSection title="Paramètres">
          <MenuItem
            icon="🌙"
            title="Mode sombre"
            subtitle="Thème de l'application"
            showArrow={false}
            rightComponent={
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{false: '#767577', true: '#00FFFF'}}
                thumbColor={darkMode ? '#fff' : '#f4f3f4'}
              />
            }
          />
          
          <MenuItem
            icon="🔔"
            title="Notifications"
            subtitle="Messages et alertes"
            showArrow={false}
            rightComponent={
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{false: '#767577', true: '#00FFFF'}}
                thumbColor={notifications ? '#fff' : '#f4f3f4'}
              />
            }
          />
          
          <MenuItem
            icon="🌍"
            title="Langue"
            subtitle={language}
            onPress={() => console.log('Change language')}
          />
          
          <MenuItem
            icon="🔒"
            title="Confidentialité"
            subtitle="Sécurité et données"
            onPress={() => console.log('Privacy')}
          />
          
          <MenuItem
            icon="💳"
            title="Paiements"
            subtitle="Méthodes de paiement"
            onPress={() => console.log('Payments')}
          />
        </MenuSection>

        <MenuSection title="Support">
          <MenuItem
            icon="❓"
            title="Centre d'aide"
            subtitle="FAQ et guides"
            onPress={() => console.log('Help')}
          />
          
          <MenuItem
            icon="📞"
            title="Nous contacter"
            subtitle="Support client"
            onPress={() => console.log('Contact')}
          />
          
          <MenuItem
            icon="📄"
            title="Conditions d'utilisation"
            onPress={() => console.log('Terms')}
          />
          
          <MenuItem
            icon="🛡️"
            title="Politique de confidentialité"
            onPress={() => console.log('Privacy policy')}
          />
        </MenuSection>

        {user.userType === 'supplier' && (
          <MenuSection title="Fournisseur">
            <MenuItem
              icon="💎"
              title="Devenir fournisseur premium"
              subtitle="Fonctionnalités avancées"
              onPress={() => console.log('Premium')}
            />
            
            <MenuItem
              icon="📈"
              title="Outils marketing"
              subtitle="Promouvoir vos produits"
              onPress={() => console.log('Marketing')}
            />
            
            <MenuItem
              icon="🚚"
              title="Gestion livraisons"
              subtitle="Transporteurs et zones"
              onPress={() => console.log('Delivery')}
            />
          </MenuSection>
        )}

        <MenuSection title="Application">
          <MenuItem
            icon="🔄"
            title="Vérifier les mises à jour"
            subtitle="Version 1.0.0"
            onPress={() => console.log('Check updates')}
          />
          
          <MenuItem
            icon="⭐"
            title="Noter l'application"
            subtitle="Donnez votre avis"
            onPress={() => console.log('Rate app')}
          />
          
          <MenuItem
            icon="📱"
            title="Partager TraduHub"
            subtitle="Inviter des amis"
            onPress={() => console.log('Share app')}
          />
        </MenuSection>

        {/* Logout Button */}
        <View style={styles.logoutContainer}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutIcon}>🚪</Text>
            <Text style={styles.logoutText}>Se déconnecter</Text>
          </TouchableOpacity>
        </View>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appInfoText}>TraduHub v1.0.0</Text>
          <Text style={styles.appInfoText}>Made with ❤️ for Africa</Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 50,
  },
  headerTitle: {
    color: '#00FFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileSection: {
    margin: 20,
    borderRadius: 20,
    overflow: 'hidden',
  },
  profileGradient: {
    padding: 20,
    borderWidth: 1,
    borderColor: '#333',
  },
  profileHeader: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 15,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#00FFFF',
  },
  verifiedBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#00FFFF',
    color: '#000',
    borderRadius: 12,
    width: 24,
    height: 24,
    textAlign: 'center',
    lineHeight: 24,
    fontSize: 16,
    fontWeight: 'bold',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderRadius: 15,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#00FFFF',
  },
  editAvatarIcon: {
    fontSize: 12,
  },
  profileInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  userName: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  userHandle: {
    color: '#00FFFF',
    fontSize: 14,
    marginBottom: 5,
  },
  userType: {
    color: '#ccc',
    fontSize: 12,
    marginBottom: 2,
  },
  userLocation: {
    color: '#666',
    fontSize: 11,
  },
  userBio: {
    color: '#ccc',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 15,
    fontStyle: 'italic',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(0,255,255,0.2)',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    color: '#00FFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#ccc',
    fontSize: 11,
    marginTop: 2,
  },
  editProfileButton: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  editProfileGradient: {
    padding: 12,
    alignItems: 'center',
  },
  editProfileText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    color: '#00FFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginBottom: 15,
  },
  menuItem: {
    marginHorizontal: 20,
    marginBottom: 8,
    borderRadius: 12,
    overflow: 'hidden',
  },
  menuItemGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    borderColor: '#333',
  },
  menuIcon: {
    fontSize: 20,
    marginRight: 15,
    width: 25,
    textAlign: 'center',
  },
  menuItemContent: {
    flex: 1,
  },
  menuTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  menuSubtitle: {
    color: '#666',
    fontSize: 12,
    marginTop: 2,
  },
  menuArrow: {
    color: '#666',
    fontSize: 20,
  },
  logoutContainer: {
    margin: 20,
    marginTop: 10,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,0,0,0.1)',
    borderWidth: 1,
    borderColor: '#ff4444',
    borderRadius: 12,
    padding: 15,
  },
  logoutIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  logoutText: {
    color: '#ff4444',
    fontSize: 16,
    fontWeight: 'bold',
  },
  appInfo: {
    alignItems: 'center',
    paddingBottom: 50,
    paddingTop: 20,
  },
  appInfoText: {
    color: '#666',
    fontSize: 12,
    marginBottom: 5,
  },
});

export default MenuScreen;