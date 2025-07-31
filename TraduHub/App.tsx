import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';
import {supabase, authService} from './src/config/supabase';

// Import screens
import HomeScreen from './src/screens/HomeScreen';
import ProductsScreen from './src/screens/ProductsScreen';
import SuppliersScreen from './src/screens/SuppliersScreen';
import MessagesScreen from './src/screens/MessagesScreen';
import MenuScreen from './src/screens/MenuScreen';
import AuthScreen from './src/screens/AuthScreen';
import ProfileScreen from './src/screens/ProfileScreen';

// Custom Tab Bar Icons
const TabIcon = ({name, focused}: {name: string; focused: boolean}) => {
  const iconColor = focused ? '#00FFFF' : '#666';
  const iconSize = focused ? 28 : 24;
  
  return (
    <View style={styles.tabIconContainer}>
      <Text style={[styles.tabIcon, {color: iconColor, fontSize: iconSize}]}>
        {getIconSymbol(name)}
      </Text>
      {focused && <View style={styles.tabIndicator} />}
    </View>
  );
};

const getIconSymbol = (name: string) => {
  switch (name) {
    case 'Accueil': return '🏠';
    case 'Produits': return '📦';
    case 'Fournisseurs': return '🏪';
    case 'Messages': return '💬';
    case 'Menu': return '☰';
    default: return '•';
  }
};

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarBackground: () => (
          <LinearGradient
            colors={['#1a1a2e', '#16213e']}
            style={StyleSheet.absoluteFillObject}
          />
        ),
        tabBarActiveTintColor: '#00FFFF',
        tabBarInactiveTintColor: '#666',
        tabBarLabelStyle: styles.tabLabel,
      }}>
      <Tab.Screen
        name="Accueil"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => <TabIcon name="Accueil" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Produits"
        component={ProductsScreen}
        options={{
          tabBarIcon: ({focused}) => <TabIcon name="Produits" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Fournisseurs"
        component={SuppliersScreen}
        options={{
          tabBarIcon: ({focused}) => <TabIcon name="Fournisseurs" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Messages"
        component={MessagesScreen}
        options={{
          tabBarIcon: ({focused}) => <TabIcon name="Messages" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Menu"
        component={MenuScreen}
        options={{
          tabBarIcon: ({focused}) => <TabIcon name="Menu" focused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState<'simple' | 'supplier' | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Vérifier la session existante
    checkAuthSession();
    
    // Écouter les changements d'authentification
    const {data: {subscription}} = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          const {data: profile} = await authService.getUserProfile(session.user.id);
          if (profile) {
            setUser(profile);
            setUserType(profile.user_type);
            setIsAuthenticated(true);
          }
        } else {
          setUser(null);
          setUserType(null);
          setIsAuthenticated(false);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const checkAuthSession = async () => {
    try {
      const {session} = await authService.getSession();
      if (session?.user) {
        const {data: profile} = await authService.getUserProfile(session.user.id);
        if (profile) {
          setUser(profile);
          setUserType(profile.user_type);
          setIsAuthenticated(true);
        }
      }
    } catch (error) {
      console.error('Error checking auth session:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    // Écran de chargement
    return (
      <LinearGradient
        colors={['#0a0a0a', '#1a1a2e', '#16213e']}
        style={styles.loadingContainer}>
        <View style={styles.loadingContent}>
          <Text style={styles.loadingLogo}>TraduHub</Text>
          <Text style={styles.loadingText}>Chargement...</Text>
          <View style={styles.loadingBar}>
            <LinearGradient
              colors={['#00FFFF', '#0080FF']}
              style={styles.loadingProgress}
            />
          </View>
        </View>
      </LinearGradient>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#0a0a0a"
        translucent={true}
      />
      <LinearGradient
        colors={['#0a0a0a', '#1a1a2e', '#16213e']}
        style={styles.container}>
        <SafeAreaView style={styles.container}>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              cardStyle: {backgroundColor: 'transparent'},
            }}>
            {!isAuthenticated ? (
              <Stack.Screen name="Auth">
                {(props) => (
                  <AuthScreen
                    {...props}
                    onAuthSuccess={(userData) => {
                      setUser(userData);
                      setUserType(userData.user_type);
                      setIsAuthenticated(true);
                    }}
                  />
                )}
              </Stack.Screen>
            ) : (
              <>
                <Stack.Screen name="MainTabs" component={MainTabs} />
                <Stack.Screen name="Profile">
                  {(props) => (
                    <ProfileScreen
                      {...props}
                      user={user}
                      onProfileUpdate={(updatedUser) => setUser(updatedUser)}
                    />
                  )}
                </Stack.Screen>
              </>
            )}
          </Stack.Navigator>
        </SafeAreaView>
      </LinearGradient>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContent: {
    alignItems: 'center',
    padding: 20,
  },
  loadingLogo: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#00FFFF',
    marginBottom: 20,
    textShadowColor: '#00FFFF',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 20,
  },
  loadingText: {
    color: '#ccc',
    fontSize: 16,
    marginBottom: 30,
  },
  loadingBar: {
    width: 200,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  loadingProgress: {
    width: '70%',
    height: '100%',
  },
  tabBar: {
    backgroundColor: 'transparent',
    borderTopWidth: 1,
    borderTopColor: '#00FFFF',
    height: 80,
    paddingBottom: 10,
    paddingTop: 10,
  },
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  tabIcon: {
    fontWeight: 'bold',
  },
  tabIndicator: {
    position: 'absolute',
    bottom: -8,
    width: 20,
    height: 3,
    backgroundColor: '#00FFFF',
    borderRadius: 2,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: 4,
  },
});

export default App;