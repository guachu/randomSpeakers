package edu.eci.arsw.randomSpeakers.randomSpeakers.springSecurity;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;


@Configuration
@EnableWebSecurity
public class SpringSecurity	 extends WebSecurityConfigurerAdapter {
	
    
	@Autowired
    AuthProvider authProvider;
    
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {		
		auth.authenticationProvider(authProvider);
	}
    
    @Override
    public void configure(WebSecurity web) throws Exception {
        web
            .ignoring()
            .antMatchers("/resources/static/*","/assets/","/js/**","/images/*","/css/*","/TemplateBootstrapFiles/")
            .antMatchers("/webjars/**");
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .authorizeRequests()
            .antMatchers("/","/register.html").permitAll()
            .antMatchers(HttpMethod.POST, "/api/identificacion/**").permitAll()
            .anyRequest().authenticated()
            .and()
            .formLogin()
                .loginPage("/index.html")
                .defaultSuccessUrl("/main.html").permitAll()
            .and()
                .logout()
                .logoutSuccessUrl("/")
            .and()
                .csrf().disable();
    }
}