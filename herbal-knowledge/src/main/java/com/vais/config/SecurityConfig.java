package com.vais.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors()
            .and()
              .authorizeRequests()
                .antMatchers(HttpMethod.GET, "/api/flowers", "/api/flowers/**", "/api/categories", "/api/categories/**" )
                  .anonymous()
                .antMatchers(HttpMethod.POST, "/api/**")
                  .hasAuthority("SCOPE_write");
    }
}
