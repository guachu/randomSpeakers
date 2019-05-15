package edu.eci.arsw.randomSpeakers.randomSpeakers.springSecurity;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;

import edu.eci.arsw.randomSpeakers.randomSpeakers.model.User;
import edu.eci.arsw.randomSpeakers.randomSpeakers.services.IdentificacionServices;

@Service
public class AuthProvider implements AuthenticationProvider {

	@Autowired
	IdentificacionServices up;
	@Override
    public boolean supports(Class<? extends Object> authentication) {
        return (UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication));
    }

    @Override
    public Authentication authenticate(Authentication auth) throws AuthenticationException {
        User usuarioTemporal = new User(auth.getPrincipal().toString(),auth.getCredentials().toString());
        System.out.println("inicio el auth");
        System.out.println("existe"+up.Autenticar(usuarioTemporal));
		if (up.Autenticar(usuarioTemporal)) {
            
            System.out.println("entro al auth");
			return new UsernamePasswordAuthenticationToken(auth.getName(), auth.getCredentials(),new ArrayList<>());
		}
        throw new BadCredentialsException("Username/Password does not match for " + auth.getPrincipal());
    }

}